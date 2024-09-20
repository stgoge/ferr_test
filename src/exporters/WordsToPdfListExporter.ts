import PdfPrinter from "pdfmake";

import type { TDocumentDefinitions } from "pdfmake/interfaces.js";
import { AbstractExporter } from "./AbstractExporter.js";
import { FastifyReply } from "fastify";

const fonts = {
  Roboto: {
    normal: "fonts/Roboto-Regular.ttf",
    bold: "fonts/Roboto-Medium.ttf",
    italics: "fonts/Roboto-Italic.ttf",
    bolditalics: "fonts/Roboto-MediumItalic.ttf",
  },
};

const printer = new PdfPrinter(fonts);

export class WordsToPdfListExporter extends AbstractExporter {
  title: string = "Just unordered list";
  separator: string = " ";
  constructor(options: WordsToPdfListExporterOptionsType = {}) {
    super();
    this.title = options.title ?? this.title;
    this.separator = options.separator ?? this.separator;
  }

  public export(text: string, response: FastifyReply) {
    return new Promise((resolve: (a: void) => void) => {
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

      const doc = printer.createPdfKitDocument(document);

      const chunks: Uint8Array[] = [];

      let result;

      doc.on("data", function (chunk) {
        chunks.push(chunk);
      });

      doc.on("end", function () {
        result = Buffer.concat(chunks);
        response.type("application/pdf").send(result);
        resolve();
      });

      doc.end();
    });
  }
}

type WordsToPdfListExporterOptionsType = {
  title?: string;
  separator?: string;
};
