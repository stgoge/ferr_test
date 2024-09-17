import { AbstractProcessor } from "./AbstractProcessor.js";
import PdfPrinter from "pdfmake";

import type { TDocumentDefinitions } from "pdfmake/interfaces.js";

const fonts = {
  Roboto: {
    normal: "fonts/Roboto-Regular.ttf",
    bold: "fonts/Roboto-Medium.ttf",
    italics: "fonts/Roboto-Italic.ttf",
    bolditalics: "fonts/Roboto-MediumItalic.ttf",
  },
};

const printer = new PdfPrinter(fonts);

export class TextToPdfListProcessor extends AbstractProcessor {
  title: string = "Just unordered list";
  separator: string = " ";
  constructor(title?: string, separator?: string) {
    super();
    this.title = title ?? this.title;
    this.separator = separator ?? this.separator;
  }
  private createPdfBinary(
    pdfDoc: TDocumentDefinitions,
    callback: (text: string) => void
  ) {
    const doc = printer.createPdfKitDocument(pdfDoc);

    const chunks: Uint8Array[] = [];

    let result;

    doc.on("data", function (chunk) {
      chunks.push(chunk);
    });

    doc.on("end", function () {
      result = Buffer.concat(chunks);
      //@ts-expect-error 123
      callback(result);
    });

    doc.end();
  }

  public process(text: string): Promise<string> {
    const list = text.split(this.separator);

    const document: TDocumentDefinitions = {
      content: [
        { text: `\n\n${this.title}\n\n`, style: "header" },
        {
          type: "square",
          color: "purple",
          ul: list,
        },
      ],
      styles: {
        header: {
          bold: true,
          fontSize: 15,
          alignment: "center",
        },
      },
      defaultStyle: {
        fontSize: 14,
      },
    };
    return new Promise((resolve) => {
      this.createPdfBinary(document, resolve);
    });
  }
}
