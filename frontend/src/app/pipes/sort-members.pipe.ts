import { Pipe, PipeTransform } from '@angular/core'
import { User } from 'src/app/classes/user'

@Pipe({
  name: 'sortMembers'
})
export class SortMembersPipe implements PipeTransform {

  public transform(members: User[], loggedUser: User): User[] {
    const loggedUserInside = members.find(u => u.id === loggedUser.id)
    const members2 = members.filter(u => u.id !== loggedUser.id)
    if (loggedUserInside === undefined) { return members }
    else {
      members2.unshift(loggedUserInside)
      return members2
    }
  }

}
