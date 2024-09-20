import { AbstractProcessor } from "./AbstractProcessor.js";

export class TextToWordsByLengthProcessor extends AbstractProcessor {
  count: number = 10;
  longest: boolean = false;
  separator: string = " ";
  constructor(options: TextToWordsByLengthProcessorOptionsType = {}) {
    super();
    this.count = options.count ?? this.count;
    this.longest = options.longest ?? this.longest;
    this.separator = options.separator ?? this.separator;
  }
  public process(text: string) {
    const words = text.split(" ");
    const set = new Set(words);
    const uniqueWords = Array.from(set);
    const result = uniqueWords
      .sort((word1, word2) =>
        this.longest ? word2.length - word1.length : word1.length - word2.length
      )
      .slice(0, this.count)
      .join(this.separator);
    return result;
  }
}

type TextToWordsByLengthProcessorOptionsType = {
  count?: number;
  longest?: boolean;
  separator?: string;
};
