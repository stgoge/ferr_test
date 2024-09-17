import { AbstractProcessor } from "./AbstractProcessor.js";

export class HTMLtoTextNativeProcessor extends AbstractProcessor {
  public process(html: string) {
    const exp = />([^<>]+)</gm;

    return Promise.resolve([...html.matchAll(exp)].join(""));
  }
}
