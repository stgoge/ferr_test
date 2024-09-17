import { AbstractProcessor } from "./processors/AbstractProcessor.js";

export class Builder {
  processors: AbstractProcessor[] = [];
  constructor(processors?: AbstractProcessor[]) {
    this.processors = processors ? processors.slice() : [];
  }
  addProcessor(processor: AbstractProcessor): this {
    this.processors.push(processor);
    return this;
  }
  build(str: string): Promise<string> {
    const processors = this.processors.slice().reverse();
    return new Promise((resolve) => {
      const buildInternal = (data: string) => {
        const processor = processors.pop();
        if (processor) {
          processor.process(data).then(buildInternal);
        } else {
          resolve(data);
        }
      };
      buildInternal(str);
    });
  }
}
