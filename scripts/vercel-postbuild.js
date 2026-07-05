#!/usr/bin/env node
// Transforms TanStack Start build output into Vercel Build Output API v3 format.
// Docs: https://vercel.com/docs/build-output-api/v3

import { cpSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// ── 1. Static assets → .vercel/output/static ─────────────────────────────────
const staticOut = resolve(root, ".vercel/output/static");
mkdirSync(staticOut, { recursive: true });
cpSync(resolve(root, "dist/client"), staticOut, { recursive: true });

// ── 2. Serverless function → .vercel/output/functions/index.func ─────────────
const funcDir = resolve(root, ".vercel/output/functions/index.func");
mkdirSync(funcDir, { recursive: true });

// Copy the entire dist/server directory into the function bundle
cpSync(resolve(root, "dist/server"), resolve(funcDir, "dist/server"), {
  recursive: true,
});

// Write the function entry point
writeFileSync(
  resolve(funcDir, "index.js"),
  `
import server from "./dist/server/server.js";

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
