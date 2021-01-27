import { Pipe, PipeTransform } from '@angular/core'
import { User } from 'src/app/classes/user'
import { TeamService } from 'src/app/services/team.service'
import { UserService } from 'src/app/services/user.service'


@Pipe({
  name: 'sortMembers'
})
export class SortMembersPipe implements PipeTransform {
  public user!: User
  public members2: User[] | undefined = new Array()

  public transform(members: User[] | undefined, loggedUser: User): User[] | undefined {
    members?.map(u => {
    if (u.surname === loggedUser.surname && u.firstname === loggedUser.firstname) { this.user = u }
      })
    const index = members?.indexOf(this.user)
    console.log(index)
    //  members?[index]=members?[0]
    // members?[0]=this.user
   // if (index?.valueOf) { }
 //   members = members?.concat(this.user)

    return members
  }

}
