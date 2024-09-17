export abstract class AbstractLoader {
  abstract load(source: string): Promise<string>;
}
