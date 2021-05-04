import { ChoiceTest, Example, MultiTest, SimpleCard } from "./classes/example"
import { ChoiceTestTask, SimpleCardTask } from "./classes/task-type"
import { Progress } from "./classes/progress"
import { Task } from "./classes/task"
import { Team } from "./classes/team"
import { User } from "./classes/user"
import { BehaviorSubject } from "rxjs"

export const simpleCards = [
  new SimpleCard('Apple', 'Jabłko'),
  new SimpleCard('Berry', 'Jagoda'),
  new SimpleCard('Grape', 'Winogorono'),
]

export const choiceTests = [
  new ChoiceTest('Q1', 'Answer 1', ['A1', 'A2', 'A3']),
  new ChoiceTest('Q2', 'Answer 2', ['A1', 'A2', 'A3']),
  new ChoiceTest('Q3', 'Answer 3', ['A1', 'A2', 'A3']),
]

export const multiTests = [
  new MultiTest('Q1', ['A1'], ['A2', 'A3']),
  new MultiTest('Q2', ['A1', 'A2'], ['A3']),
  new MultiTest('Q3', ['A1', 'A2', 'A3'], []),
]

export const simpleCardTask = new Task<SimpleCard>(
  '9ad753e4-58a4-4121-96f6-dad350f38867', 'Simple card task',
  simpleCards, SimpleCardTask, 'description')

export const choiceTestTask = new Task<ChoiceTest>(
  'cd87e113-498f-44a3-8bd4-aa0dcb1c3145', 'Choice test task',
  choiceTests, ChoiceTestTask, 'description')

export const multiTestTask = new Task<MultiTest>(
  'd6011fb7-224c-4225-8954-6df864319de4', 'Multi test task',
  multiTests, SimpleCardTask, 'description')

export const tasks: Array<Task<Example>> = [
  simpleCardTask,
  choiceTestTask,
  multiTestTask,
]

const progress: Array<Progress> = tasks.map(t => new Progress(t, 50))

export const users: Array<User> = [
  new User('69c4870b-c088-4349-a290-79838d836ca2', 'Jon', 'Doe', '2Rf2b9Fa',
    'jdoe', [...progress], '#000000'),
  new User('393224a3-398e-4b66-b4ce-1a17d6439a2d', 'Jay', 'Bay', 'PxXxB9QL',
    'jbay', [...progress], '#111111'),
  new User('499116bc-9518-4627-803f-ccefc05b0c3f', 'Ann', 'Tan', 'LqgDKNgA',
    'apam', [...progress], '#222222'),
  new User('baad96e8-747c-4fc7-9473-53c40b014e9b', 'Rob', 'Fob', 'bzM9EE9e',
    'rfob', [...progress], '#333333'),
  new User('de01e653-81b6-4679-811d-3d32f6eb3037', 'Sai', 'Hay', 'PprnhbCF',
    'shay', [...progress], '#444444'),
]

const [leader, ...members] = users

export const team = new Team(
  'Test team', '9ad753e4-58a4-4121-96f6-dad350f38867',
  leader, members, tasks, 'Test team description', '#555555')

export const fakeUserService = () => ({
  user: new BehaviorSubject(User.empty),
  authHeader() { return {} },
  logged: false,
  login() {
    this.logged = true
    this.user.next(users[0])
  },
  logout() {
    this.logged = false
    this.user.next(User.empty)
  }
})
