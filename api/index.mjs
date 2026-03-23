import { createRequestListener } from "@react-router/node";

let handler;

export default async function (req, res) {
  try {
    if (!handler) {
      const build = await import("../build/se`rver/index.js");
      handler = createRequestListener({
        build,
        mode: "production",
      });
    }
    return handler(req, res);
  } catch (error) {
    console.error("Serverless function error:", error);
    res.statusCode = 500;
    res.end("Internal Server Error: " + error.message);
  }
}