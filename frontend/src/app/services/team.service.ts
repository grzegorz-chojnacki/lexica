import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { Team } from 'src/app/classes/team'
import { User } from 'src/app/classes/user'
import { SimpleCard, Task } from '../classes/task'

export const testUsers: User[] = [
  new User('Lyn',       'Tommaseo',    'ltommaseo@example.com'),
  new User('Amie',      'Acomb',       'aacomb@example.com'),
  new User('Frederich', 'Bastow',      'fbastow@example.com'),
  new User('Hilde',     'Felten',      'hfelten@example.com'),
  new User('Fraser',    'Spaule',      'fspaule@example.com'),
  new User('Erna',      'Yokley',      'eyokley@example.com'),
  new User('Walt',      'Verrick',     'wverrick@example.com'),
  new User('Ossie',     'Capoun',      'ocapoun@example.com'),
  new User('Damita',    'Fransinelli', 'dfransinelli@example.com'),
  new User('Peggie',    'Gerrelt',     'pgerrelt@example.com'),
]

export const testTeams: Team[] = [
  new Team('Khaki',      'BQMah7Ixwx9v', testUsers[0], [
    testUsers[1],
    testUsers[2],
    testUsers[3],
    testUsers[4],
    testUsers[5],
    testUsers[6],
  ], [
    new Task('e6SqZ', 'Zadanie z fiszkami 1', [new SimpleCard('a', 'b')],  true, 'Opis zadania z fiszkami 1'),
    new Task('A1WSD', 'Zadanie z fiszkami 2', [new SimpleCard('c', 'd')],  true),
    new Task('4Fr6v', 'Zadanie z fiszkami 3', [new SimpleCard('e', 'f')], false, 'Opis zadania z fiszkami 3'),
  ], 'Milt op involving oth dest arcrft, civilian, sequela'),
  new Team('Aquamarine', 'HjWY3JkRPaxE', testUsers[1], [], [],
  'Contracture, unspecified hip'),
  new Team('Fuscia',     'tf75eN8ZF1fV', testUsers[2], [], [],
  'Smith\'s fx r radius, subs for opn fx type I/2 w nonunion'),
  new Team('Orange',     'QxOJhUAE5sjc', testUsers[3], [], [],
  'Stress fracture, right femur, initial encounter for fracture'),
  new Team('Aquamarine', 'JFF7Z2AUuyqf', testUsers[5], [], [],
  'Left sided colitis'),
  new Team('Crimson',    'SYBHczTK8MjJ', testUsers[6], [], [],
  'Pulsating exophthalmos, left eye'),
  new Team('Mauv',       'FcRgvcxAo39D', testUsers[4], [], []),
]

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly teamSource = new BehaviorSubject<Team[]>(testTeams)

  public constructor() { }

  public get teams(): Observable<Team[]> {
    return this.teamSource.asObservable()
  }

  // ToDo: try to find team with this hash in cached teams (teamSource)
  //       or query server with it
  public getTeam(hash: string | null): Promise<Team> {
    return new Promise((resolve, reject) => {
      const foundTeam = this.teamSource.getValue()
        .find(team => team.hash === hash)

      return (foundTeam) ? resolve(foundTeam) : reject('Team not found')
    })
  }

  // ToDo: Api request
  public remove(removedTeam: Team): void {
    const withoutRemovedTeam = this.teamSource.value
      .filter(team => team !== removedTeam)

    this.teamSource.next(withoutRemovedTeam)
  }
}
