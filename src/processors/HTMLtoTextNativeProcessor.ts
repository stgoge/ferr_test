import { AbstractProcessor } from "./AbstractProcessor.js";

export class HTMLtoTextNativeProcessor extends AbstractProcessor {
  public process(html: string) {
    const exp = />([^<>]+)</gm;

    const text = [...html.matchAll(exp)]
      .map((el) => {
        return el[1];
      })
      .join(" ");

    return text;
  }
}
