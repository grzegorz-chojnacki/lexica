import { User } from '../classes/user';
import { TeamLeaderOverlinePipe } from './team-leader-overline.pipe'

describe('TeamLeaderOverlinePipe', () => {
  it('create an instance', () => {
    const pipe = new TeamLeaderOverlinePipe()
    expect(pipe).toBeTruthy()
  })

  it('should display full name', () => {
    const pipe = new TeamLeaderOverlinePipe()
    const leader = new User('Firstname', 'Surname', 'email')

    expect(pipe.transform(leader)).toBe('Firstname Surname')
  })
});
