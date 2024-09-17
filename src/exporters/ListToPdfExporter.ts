import { FastifyReply } from "fastify";
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

export class ListToPdfExporter {
  title: string = "Just unordered list";
  separator: string = " ";

  constructor(title?: string, separator?: string) {
    this.title = title ?? this.title;
    this.separator = separator ?? this.separator;
  }

  export(data: string, response: FastifyReply) {
    const list = data.split(this.separator);

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

    const doc = printer.createPdfKitDocument(document);

    const chunks: Uint8Array[] = [];

    let result;

    doc.on("data", function (chunk) {
      chunks.push(chunk);
    });

    doc.on("end", function () {
      result = Buffer.concat(chunks);
      response.type("application/pdf").send(result);
    });

    doc.end();
  }
}
