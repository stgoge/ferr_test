import { AbstractLoader } from "./AbstractLoader.js";

export class FromSingleUrlLoader extends AbstractLoader {
  load(url: string) {
    return fetch(url).then((res) => res.text());
  }
}
