import { SimpleCardTask, ChoiceTestTask, TaskType } from "./task-type"

export abstract class Example {
  public static parse(text: string): [Example[], TaskType] {
    const examples = JSON.parse(text)
    if (examples.every(SimpleCard.validate)) {
      return [examples, SimpleCardTask]
    } else if (examples.every(ChoiceTest.validate)) {
      return [examples, ChoiceTestTask]
    } else {
      throw new Error('Examples did not match any type of Example')
    }
  }
}

export class SimpleCard extends Example {
  public static validate = (example: any) => example.foreignWord && example.nativeWord

  public constructor(
    public foreignWord: string,
    public nativeWord: string,
  ) { super() }
}

export class ChoiceTest extends Example {
  public static validate = (example: any) => example.question && example.answer
    && Array.isArray(example.decoys)

  public constructor(
    public question: string,
    public answer: string,
    public decoys: string[],
  ) { super() }
}
export class MultiTest extends Example {
  public static validate = (example: any) => example.question && Array.isArray(example.answers)
    && Array.isArray(example.decoys)

  public constructor(
    public question: string,
    public answers: string[],
    public decoys: string[],
  ) { super() }
}
