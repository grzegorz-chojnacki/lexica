import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { Team } from 'src/app/classes/team'
import { User } from 'src/app/classes/user'
import { Progress } from '../classes/progress'
import { SimpleCard, Task } from '../classes/task'

const testCards = [
  new SimpleCard('Jabłko', 'Apple'),
  new SimpleCard('Banan', 'Banana'),
  new SimpleCard('Pomarańcza', 'Orange'),
  new SimpleCard('Mango', 'Mango'),
]

const   activated = true
const deactivated = false
const testTasks = [
  new Task('e6SqZ',
    'Zadanie z fiszkami 1',
    testCards, activated,
    'Opis zadania z fiszkami 1'),
  new Task('A1WSD',
    'Zadanie bez opisu',
    testCards, activated),
  new Task('4Fr6v',
    'Zadanie z fiszkami 2',
    testCards, activated,
    'Jakieś następne zadanie'),
  new Task('dBT1o',
    'Zadanie z fiszkami 3',
    testCards, activated,
    `Opis zadania z bardzo długim opisiem, który najprawdopodobniej powinien
     zostać ograniczony`),
  new Task('BlLAj',
    'Zadanie nieaktywne',
    testCards, deactivated,
    'Opis zadania nieaktywnego'),
  new Task('dLXM7',
    'Zadanie z trochę dłuższym tytułem',
    testCards, activated,
    'Opis zadania z dłuższym tytułem'),
]

const testProgress = [
  new Progress(testTasks[0], 10),
  new Progress(testTasks[1], 20),
  new Progress(testTasks[2], 30),
  new Progress(testTasks[3], 40),
  new Progress(testTasks[4], 100),
]

export const testUsers: User[] = [
  new User('Lyn',       'Tommaseo',    'ltommaseo@example.com',    testProgress),
  new User('Amie',      'Acomb',       'aacomb@example.com',       testProgress),
  new User('Frederich', 'Bastow',      'fbastow@example.com',      testProgress),
  new User('Hilde',     'Felten',      'hfelten@example.com',      testProgress),
  new User('Fraser',    'Spaule',      'fspaule@example.com',      testProgress),
  new User('Erna',      'Yokley',      'eyokley@example.com',      testProgress),
  new User('Walt',      'Verrick',     'wverrick@example.com',     testProgress),
  new User('Ossie',     'Capoun',      'ocapoun@example.com',      testProgress),
  new User('Damita',    'Fransinelli', 'dfransinelli@example.com', testProgress),
  new User('Peggie',    'Gerrelt',     'pgerrelt@example.com',     testProgress),
]

const testUserGroup = (leader: User) => testUsers.filter(user => user !== leader)

export const testTeams: Team[] = [
  new Team('Khaki', 'BQMah7Ixwx9v',
    testUsers[0], testUserGroup(testUsers[0]), testTasks,
    'Milt op involving oth dest arcrft, civilian, sequela'),
  new Team('Aquamarine', 'HjWY3JkRPaxE',
    testUsers[1], testUserGroup(testUsers[1]), testTasks,
    'Contracture, unspecified hip'),
  new Team('Fuscia', 'tf75eN8ZF1fV',
    testUsers[2], testUserGroup(testUsers[2]), testTasks,
    'Smith\'s fx r radius, subs for opn fx type I/2 w nonunion'),
  new Team('Orange', 'QxOJhUAE5sjc',
    testUsers[3], testUserGroup(testUsers[3]), testTasks,
    'Stress fracture, right femur, initial encounter for fracture'),
  new Team('Aquamarine', 'JFF7Z2AUuyqf',
    testUsers[5], testUserGroup(testUsers[5]), testTasks,
    'Left sided colitis'),
  new Team('Crimson', 'SYBHczTK8MjJ',
    testUsers[6], testUserGroup(testUsers[6]), testTasks,
    'Pulsating exophthalmos, left eye'),
  new Team('Mauv', 'FcRgvcxAo39D',
    testUsers[4], testUserGroup(testUsers[4]), testTasks,
)]

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
