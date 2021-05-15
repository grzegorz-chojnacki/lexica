import { User } from '../classes/user'
import { users } from '../test-data'
import { FullNamePipe } from './full-name.pipe'

describe('FullNamePipe', () => {
  it('should create an instance', () => {
    const pipe = new FullNamePipe()
    expect(pipe).toBeTruthy()
  })

  it('should transform user', () => {
    const pipe = new FullNamePipe()
    const user = users[0]

    const fullName = pipe.transform(user)

    expect(fullName).toContain(user.firstname)
    expect(fullName).toContain(user.surname)
  })

  it('should handle invalid user objects', () => {
    const pipe = new FullNamePipe()
    let fullName = ''

    expect(() => { fullName = pipe.transform({ } as User)}).not.toThrowError()
    expect(fullName).toBe('')
  })
})
