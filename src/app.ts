import { Builder } from "./Builder.js";
import { HTMLtoTextProcessor } from "./processors/HTMLtoTextProcessor.js";
import { WordsToPdfListExporter } from "./exporters/WordsToPdfListExporter.js";
import { FromSingleUrlLoader } from "./loaders/FromSingleUrlLoader.js";
import { TextToWordsByLengthProcessor } from "./processors/TextToWordsByLengthProcessor.js";
import { startServer } from "./server.js";

const WORDS_COUNT = 10;
const LONGEST = true;

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

startServer(builder);
