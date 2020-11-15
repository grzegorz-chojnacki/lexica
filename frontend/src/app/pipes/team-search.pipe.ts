import { Pipe, PipeTransform } from '@angular/core'
import { Team } from '../classes/team'

@Pipe({
  name: 'teamsearch'
})
export class TeamSearchPipe implements PipeTransform {

  private closeEnough(nameA: string, nameB: string): boolean {
    return nameA.toLowerCase().includes(nameB.toLowerCase())
  }

  public transform(teams: Team[], name = ''): Team[] {
    if (name === '') {
      return teams
    } else {
      return teams.filter((team: Team) => this.closeEnough(team.name, name))
    }
  }

}
