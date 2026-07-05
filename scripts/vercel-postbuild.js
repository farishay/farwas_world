#!/usr/bin/env node
// Transforms TanStack Start build output into Vercel Build Output API v3 format.
// Docs: https://vercel.com/docs/build-output-api/v3

import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { cpSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// ── 1. Static assets → .vercel/output/static ─────────────────────────────────
const staticOut = resolve(root, ".vercel/output/static");
mkdirSync(staticOut, { recursive: true });
cpSync(resolve(root, "dist/client"), staticOut, { recursive: true });

// ── 2. Serverless function → .vercel/output/functions/index.func ─────────────
const funcDir = resolve(root, ".vercel/output/functions/index.func");
mkdirSync(funcDir, { recursive: true });

// Write the function entry point (adapter: Node.js HTTP → Web Fetch API)
const entrySource = resolve(root, "scripts/_vercel-handler-entry.js");
writeFileSync(
  entrySource,
  `
import server from "../dist/server/server.js";

export default async function handler(req, res) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["host"];
  const url = \`\${protocol}://\${host}\${req.url}\`;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      value.forEach((v) => headers.append(key, v));
    } else {
      headers.set(key, value);
    }
  }

  const method = req.method ?? "GET";
  const hasBody = !["GET", "HEAD"].includes(method);

  let body = null;
  if (hasBody) {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    body = Buffer.concat(chunks);
  }

  const request = new Request(url, { method, headers, body });

  try {
    const response = await server.fetch(request, {}, {});
    res.statusCode = response.status;
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }
    const responseBody = await response.arrayBuffer();
    res.end(Buffer.from(responseBody));
  } catch (err) {
    console.error("SSR error:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
`.trimStart(),
);

// Bundle the server + all node_modules into a single self-contained file
await build({
  entryPoints: [entrySource],
  bundle: true,
  outfile: resolve(funcDir, "index.js"),
  platform: "node",
  format: "esm",
  // Keep Node built-ins external (they're always available on Vercel)
  external: ["node:*"],
  // Suppress "use client" / "use server" directive warnings from React packages
  logOverride: { "ignored-bare-use": "silent" },
});

// Clean up temp entry source
rmSync(entrySource, { force: true });

// Write the function configuration
writeFileSync(
  resolve(funcDir, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "nodejs22.x",
      handler: "index.js",
      launcherType: "Nodejs",
      shouldAddHelpers: true,
    },
    null,
    2,
  ),
);

// ── 3. Top-level Vercel output config ─────────────────────────────────────────
writeFileSync(
  resolve(root, ".vercel/output/config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        // Serve static assets directly (JS, CSS, images, fonts, etc.)
        {
          src: "^/assets/(.*)$",
          dest: "/assets/$1",
        },
        {
          src: "^/(favicon\\.ico|.*\\.pdf|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.webp|.*\\.woff2?)$",
          dest: "/$1",
        },
        // Everything else → SSR function
        {
          src: "^/(.*)$",
          dest: "/index",
        },
      ],
    },
    null,
    2,
  ),
);

console.log(
  "✓ Vercel Build Output API v3 artifacts written to .vercel/output/",
);
