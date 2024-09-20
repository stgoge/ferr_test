import { Builder } from "./Builder.js";
import { WordsToPdfListExporter } from "./exporters/WordsToPdfListExporter.js";
import { FromSingleUrlLoader } from "./loaders/FromSingleUrlLoader.js";
import { TextToWordsByLengthProcessor } from "./processors/TextToWordsByLengthProcessor.js";
import { HTMLtoTextNativeProcessor } from "./processors/HTMLtoTextNativeProcessor.js";
import startServer from "./server.js";

const WORDS_COUNT = 10;
const LONGEST = true;

const builder = new Builder({
  loader: new FromSingleUrlLoader(),
  processors: [
    new HTMLtoTextNativeProcessor(),
    new TextToWordsByLengthProcessor({ count: WORDS_COUNT, longest: LONGEST }),
  ],
  exporter: new WordsToPdfListExporter({
    title: `Top ${WORDS_COUNT} ${
      LONGEST ? "longest" : "shortest"
    } words on page`,
  }),
});

startServer(builder);
