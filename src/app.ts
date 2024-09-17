import { Builder } from "./Builder.js";
import { HTMLtoTextProcessor } from "./processors/HTMLtoTextProcessor.js";
import { ListToPdfExporter } from "./exporters/ListToPdfExporter.js";
import { LoadFromSingleUrlProcessor } from "./processors/LoadFromSingleUrlProcessor.js";
import { WordsByLengthProcessor } from "./processors/WordsByLengthProcessor.js";
import { initServer } from "./server.js";

const builder = new Builder();

const WORDS_COUNT = 10;
const LONGEST = true;

builder
  .addProcessor(new LoadFromSingleUrlProcessor())
  .addProcessor(new HTMLtoTextProcessor())
  .addProcessor(new WordsByLengthProcessor(WORDS_COUNT, LONGEST));

const exporter = new ListToPdfExporter(
  `Top ${WORDS_COUNT} ${LONGEST ? "longest" : "shortest"} words on page`
);

initServer(builder, exporter);
