import { User } from '../classes/user'
import { FullNamePipe } from './full-name.pipe'

describe('FullNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FullNamePipe()
    expect(pipe).toBeTruthy()
  })

  it('should display full name', () => {
    const pipe = new FullNamePipe()
    const leader = new User('Firstname', 'Surname', 'email')

    expect(pipe.transform(leader)).toBe('Firstname Surname')
  })
})
