import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import { Builder } from "./Builder.js";
import { ListToPdfExporter } from "./exporters/ListToPdfExporter.js";

const isUrl = (s: string) => {
  try {
    new URL(s);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return false;
  }
};

const server = fastify();
const PORT = 8080;

const initServer = async (builder: Builder, exporter: ListToPdfExporter) => {
  await server.register(view, { engine: { pug } });

  server.get("/", (req, res) => {
    //@ts-expect-error 123
    const { url } = req.query;
    if (url) {
      if (!isUrl(url)) {
        res.view("/src/views/index", { url, warning: true });
      }
      builder.build(url).then((data: string) => {
        exporter.export(data, res);
      });
    } else {
      res.view("/src/views/index");
    }
  });

  server.listen({ port: PORT }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
};

export { initServer };
