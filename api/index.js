import { Readable } from "node:stream";

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

export default async function handler(req, res) {
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
