import { convert } from "html-to-text";
import { AbstractProcessor } from "./AbstractProcessor.js";

export class HTMLtoTextProcessor extends AbstractProcessor {
  public process(html: string) {
    const convertOptions = {
      selectors: [
        {
          selector: "a",
          options: {
            ignoreHref: true,
          },
        },
      ],
    };

    return Promise.resolve(convert(html, convertOptions));
  }
}
