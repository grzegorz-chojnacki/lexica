import { Pipe, PipeTransform } from '@angular/core'
import { User } from 'src/app/classes/user'
import { Progress } from '../classes/progress'
import { Team } from '../classes/team'

@Pipe({
  name: 'sortMembers'
})
export class SortMembersPipe implements PipeTransform {

  public transform(team: Team, loggedUser: User): User[] {

    function completion(user: User): number {
     const progress = team.tasks.map(task => user.getTaskProgress(task))
     return Math.round(progress.reduce(Progress.sum, 0) / progress.length)
    }

    if (team.tasks.length > 0) {
    team.members.sort((u1, u2) => completion(u2) - completion(u1))
  }
    const loggedUserInside = team.members.find(u => u.id === loggedUser.id)
    const members2 = team.members.filter(u => u.id !== loggedUser.id)
    if (loggedUserInside === undefined) { return team.members }
    else {
      members2.unshift(loggedUserInside)
      return members2
    }
  }

}
