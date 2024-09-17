import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import { Builder } from "./Builder.js";

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
await server.register(view, { engine: { pug } });

const PORT = 8080;

const startServer = (builder: Builder) => {
  server.get("/", (req, res) => {
    //@ts-expect-error 123
    const { url } = req.query;

    if (url) {
      if (!isUrl(url)) {
        return res.view("/src/views/index", { url, warning: true });
      }

      builder.build(url, res).then(() => {
        res.code(200).send();
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

export { startServer };
