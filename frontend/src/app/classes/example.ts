export abstract class Example { }

export class SimpleCard extends Example {
  public constructor(
    public foreignWord: string,
    public nativeWord: string,
  ) { super() }
}

export class ChoiceTest extends Example {
  public constructor(
    public question: string,
    public answer: string,
    public decoys: string[],
  ) { super() }

}
