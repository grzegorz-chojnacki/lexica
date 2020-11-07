export class User {
  public constructor(
    public firstname: string,
    public surname: string,
    public email: string,
    public readonly avatar?: ImageBitmap) { }
}
