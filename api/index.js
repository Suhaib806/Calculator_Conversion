import { Readable } from "node:stream";
import { readFile } from "node:fs/promises";
import path from "node:path";

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return chunks.length ? Buffer.concat(chunks) : undefined;
}

function toHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [key, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) headers.append(key, item);
    } else if (value !== undefined) {
      headers.set(key, value);
    }
  }
  return headers;
}

function getContentType(filePath) {
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (filePath.endsWith(".json")) return "application/json; charset=utf-8";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
  if (filePath.endsWith(".webp")) return "image/webp";
  if (filePath.endsWith(".ico")) return "image/x-icon";
  if (filePath.endsWith(".txt")) return "text/plain; charset=utf-8";
  return "application/octet-stream";
}

export default async function handler(req, res) {
  const requestedPath = req.url?.split("?")[0] ?? "/";
  if (requestedPath.startsWith("/assets/") || requestedPath === "/.assetsignore") {
    const safePath = requestedPath.replace(/^\/+/, "");
    const filePath = path.join(process.cwd(), "dist", "client", safePath);
    try {
      const file = await readFile(filePath);
      res.statusCode = 200;
      res.setHeader("content-type", getContentType(filePath));
      res.setHeader("cache-control", "public, max-age=31536000, immutable");
      res.end(file);
      return;
    } catch {
      res.statusCode = 404;
      res.end("Not Found");
      return;
    }
  }

  const { default: app } = await import("../dist/server/server.js");

  const proto = req.headers["x-forwarded-proto"] ?? "https";
  const host = req.headers["x-forwarded-host"] ?? req.headers.host;
  const url = `${proto}://${host}${req.url}`;
  const method = req.method ?? "GET";

  const body = method === "GET" || method === "HEAD" ? undefined : await readBody(req);

  const request = new Request(url, {
    method,
    headers: toHeaders(req.headers),
    body,
    duplex: "half",
  });

  const response = await app.fetch(request);

  res.statusCode = response.status;

  if (typeof response.headers.getSetCookie === "function") {
    const cookies = response.headers.getSetCookie();
    if (cookies.length) res.setHeader("set-cookie", cookies);
  }

  response.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "set-cookie") {
      res.setHeader(key, value);
    }
  });

  if (!response.body) {
    res.end();
    return;
  }

  Readable.fromWeb(response.body).pipe(res);
}
