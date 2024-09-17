import { FastifyReply } from "fastify";
import { AbstractExporter } from "./exporters/AbstractExporter.js";
import { AbstractLoader } from "./loaders/AbstractLoader.js";
import { AbstractProcessor } from "./processors/AbstractProcessor.js";

export class Builder {
  loader: AbstractLoader;
  processors: AbstractProcessor[];
  exporter: AbstractExporter;
  constructor(options: {
    loader: AbstractLoader;
    processors?: AbstractProcessor[];
    exporter: AbstractExporter;
  }) {
    this.loader = options.loader;
    this.processors = options.processors ? options.processors.slice() : [];
    this.exporter = options.exporter;
  }

  build(source: string, response: FastifyReply) {
    return new Promise((resolve) => {
      this.loader.load(source).then((data: string) => {
        const processors = this.processors.slice().reverse();

        const internalProcess = (text: string) => {
          const processor = processors.pop();

          if (processor) {
            processor.process(text).then(internalProcess);
          } else {
            this.exporter.export(text, response).then(resolve);
          }
        };

        internalProcess(data);
      });
    });
  }
}
