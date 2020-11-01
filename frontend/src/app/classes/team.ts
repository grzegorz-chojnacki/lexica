export class Team {
  public constructor(
    public readonly name: string,
    public readonly image: ImageBitmap,
    public readonly description: string,
    public readonly leader: any, /* User */
    public readonly members: any[] /* User[] */ ) { }
}
