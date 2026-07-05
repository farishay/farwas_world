// Vercel serverless function adapter for TanStack Start
import server from "../dist/server/server.js";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["host"];
  const url = `${protocol}://${host}${req.url}`;

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

  const response = await server.fetch(request, {}, {});

  res.status(response.status);

  for (const [key, value] of response.headers.entries()) {
    res.setHeader(key, value);
  }

  const responseBody = await response.arrayBuffer();
  res.end(Buffer.from(responseBody));
}
