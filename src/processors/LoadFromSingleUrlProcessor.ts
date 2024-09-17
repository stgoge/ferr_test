import { AbstractProcessor } from "./AbstractProcessor.js";

export class LoadFromSingleUrlProcessor extends AbstractProcessor {
  process(url: string) {
    return fetch(url).then((res) => res.text());
  }
}
