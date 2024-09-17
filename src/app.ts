import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";

import { Builder } from "./Builder.js";
import { HTMLtoTextProcessor } from "./processors/HTMLtoTextProcessor.js";
import { WordsToPdfListExporter } from "./exporters/WordsToPdfListExporter.js";
import { FromSingleUrlLoader } from "./loaders/FromSingleUrlLoader.js";
import { TextToWordsByLengthProcessor } from "./processors/TextToWordsByLengthProcessor.js";

const WORDS_COUNT = 10;
const LONGEST = true;

const PORT = 8080;

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

const builder = new Builder({
  loader: new FromSingleUrlLoader(),
  processors: [
    new HTMLtoTextProcessor(),
    new TextToWordsByLengthProcessor(WORDS_COUNT, LONGEST),
  ],
  exporter: new WordsToPdfListExporter(
    `Top ${WORDS_COUNT} ${LONGEST ? "longest" : "shortest"} words on page`
  ),
});

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
