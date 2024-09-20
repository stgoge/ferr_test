import { FastifyReply } from "fastify";
import { AbstractExporter } from "./exporters/AbstractExporter.js";
import { AbstractLoader } from "./loaders/AbstractLoader.js";
import { AbstractProcessor } from "./processors/AbstractProcessor.js";

export class Builder {
  loader: AbstractLoader;
  processors: AbstractProcessor[];
  exporter: AbstractExporter;

  constructor(options: BuilderOptionsType) {
    this.loader = options.loader;
    this.processors = options.processors ? options.processors.slice() : [];
    this.exporter = options.exporter;
  }

  async build(source: string, response: FastifyReply) {
    let data;
    try {
      data = await this.loader.load(source);
    } catch {
      throw Error("Cant load page.");
    }

    const processors = this.processors.slice().reverse();
    let processor = processors.pop();

    while (processor) {
      data = processor.process(data);
      processor = processors.pop();
    }

    try {
      await this.exporter.export(data, response);
    } catch {
      throw Error("Cant export document.");
    }
  }
}

type BuilderOptionsType = {
  loader: AbstractLoader;
  processors?: AbstractProcessor[];
  exporter: AbstractExporter;
};
