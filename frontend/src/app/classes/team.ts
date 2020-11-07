import { User } from 'src/app/classes/user'

export class Team {
  public constructor(
    public readonly name: string,
    public readonly hash: string,
    public readonly leader: User,
    public readonly members: User[],
    public readonly description: string = '',
    public readonly image?: ImageBitmap) { }
}
