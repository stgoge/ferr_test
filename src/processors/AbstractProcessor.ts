export abstract class AbstractProcessor {
  public abstract process(text: string): Promise<string>;
}
