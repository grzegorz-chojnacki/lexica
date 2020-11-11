import { Progress } from './progress'

export class User {
  public constructor(
    public firstname: string,
    public surname: string,
    public email: string,
    public readonly progress: Progress[] = [],
    public readonly avatar?: ImageBitmap) { }
}
