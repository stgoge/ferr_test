import _ from "lodash";
import { AbstractProcessor } from "./AbstractProcessor.js";

export class WordsByLengthProcessor extends AbstractProcessor {
  count: number = 10;
  longest: boolean = false;
  separator: string = " ";
  constructor(count?: number, longest?: boolean, separator?: string) {
    super();
    this.count = count ?? this.count;
    this.longest = longest ?? this.longest;
    this.separator = separator ?? this.separator;
  }
  public process(text: string) {
    const words = _.words(text)
      .sort((word1, word2) =>
        this.longest ? word2.length - word1.length : word1.length - word2.length
      )
      .slice(0, this.count)
      .join(this.separator);
    return Promise.resolve(words);
  }
}
