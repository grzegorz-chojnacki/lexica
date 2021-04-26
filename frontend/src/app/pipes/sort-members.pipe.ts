import { Pipe, PipeTransform } from '@angular/core'
import { User } from 'src/app/classes/user'
import { Progress } from '../classes/progress'
import { Team } from '../classes/team'

@Pipe({
  name: 'sortMembers',
  pure: false
})
export class SortMembersPipe implements PipeTransform {

  public transform(team: Team, loggedUser: User): User[] {
    const completion = (user: User) => team
      .getUserProgress(user)
      .reduce(Progress.sum, 0)

    team.members.sort((u1, u2) => completion(u2) - completion(u1))

    if (team.members.find(u => u === loggedUser)) {
      return [loggedUser, ...team.members.filter(u => u !== loggedUser)]
    } else {
      return team.members
    }
  }
}
