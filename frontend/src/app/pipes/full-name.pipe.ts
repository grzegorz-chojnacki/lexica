import { Pipe, PipeTransform } from '@angular/core'
import { User } from '../classes/user'

@Pipe({
  name: 'fullNamePipe',
  pure: false
})
export class FullNamePipe implements PipeTransform {

  public transform(user: User): string {
    if (user?.firstname && user?.surname) {
      return `${user.firstname} ${user.surname}`
    } else {
      return ''
    }
  }
}
