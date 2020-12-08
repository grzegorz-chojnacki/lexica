import { Team } from 'src/app/classes/team'
import { User } from 'src/app/classes/user'
import { Progress } from './classes/progress'
import { SimpleCard, Task } from './classes/task'
import { SimpleCardTask } from './classes/task-type'

const testCards = [
  new SimpleCard('Jabłko', 'Apple'),
  new SimpleCard('Banan', 'Banana'),
  new SimpleCard('Pomarańcza', 'Orange'),
  new SimpleCard('Mango', 'Mango'),
]

const activated = true
const deactivated = false
export const testTasks = [
  new Task('e6SqZ',
    'Zadanie z fiszkami 1',
    testCards, SimpleCardTask, activated,
    'Opis zadania z fiszkami 1'),
  new Task('A1WSD',
    'Zadanie bez opisu',
    testCards, SimpleCardTask, activated),
  new Task('4Fr6v',
    'Zadanie z fiszkami 2',
    testCards, SimpleCardTask, activated,
    'Jakieś następne zadanie'),
  new Task('dBT1o',
    'Zadanie z fiszkami 3',
    testCards, SimpleCardTask, activated,
    `Opis zadania z bardzo długim opisiem, który najprawdopodobniej powinien
     zostać ograniczony`),
  new Task('BlLAj',
    'Zadanie nieaktywne',
    testCards, SimpleCardTask, deactivated,
    'Opis zadania nieaktywnego'),
  new Task('dLXM7',
    'Zadanie z trochę dłuższym tytułem',
    testCards, SimpleCardTask, activated,
    'Opis zadania z dłuższym tytułem'),
]

const testProgress1 = [
  new Progress(testTasks[0].id,  0),
  new Progress(testTasks[1].id, 30),
  new Progress(testTasks[2].id, 34),
  new Progress(testTasks[3].id, 56),
  new Progress(testTasks[4].id, 28),
]

const testProgress2 = [
  new Progress(testTasks[0].id, 53),
  new Progress(testTasks[1].id, 13),
  new Progress(testTasks[2].id, 23),
  new Progress(testTasks[3].id, 49),
  new Progress(testTasks[4].id, 19),
]

export const testUsers: User[] = [
  new User('Lyn', 'Tommaseo', 'ltommaseo@example.com', testProgress1),
  new User('Amie', 'Acomb', 'aacomb@example.com', testProgress2),
  new User('Frederich', 'Bastow', 'fbastow@example.com', testProgress1),
  new User('Hilde', 'Felten', 'hfelten@example.com', testProgress2),
  new User('Fraser', 'Spaule', 'fspaule@example.com', testProgress1),
  new User('Erna', 'Yokley', 'eyokley@example.com', testProgress1),
  new User('Walt', 'Verrick', 'wverrick@example.com', testProgress2),
  new User('Ossie', 'Capoun', 'ocapoun@example.com', testProgress1),
  new User('Damita', 'Fransinelli', 'dfransinelli@example.com', testProgress2),
  new User('Peggie', 'Gerrelt', 'pgerrelt@example.com', testProgress2),
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
    testUsers[4], testUserGroup(testUsers[4]), testTasks
  )
]
