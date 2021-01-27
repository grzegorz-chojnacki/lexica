import { Pipe, PipeTransform } from '@angular/core'
import { User } from 'src/app/classes/user'
import { TeamService } from 'src/app/services/team.service'
import { UserService } from 'src/app/services/user.service'


@Pipe({
  name: 'sortMembers'
})
export class SortMembersPipe implements PipeTransform {
  public user!: User

  public transform(members: User[] | undefined, loggedUser: User): User[] | undefined {
    //this.userService.user.subscribe(u => this.user = u)
    return members?.slice(3, 8)
  }

}
