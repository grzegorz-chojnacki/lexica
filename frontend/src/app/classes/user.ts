export class User {
  public constructor(
    public readonly firstname: string,
    public readonly surname: string,
    public readonly email: string,
    public readonly avatar?: ImageBitmap) { }
}
