import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../classes/user';

@Pipe({
  name: 'fullNamePipe',
  pure: false
})
export class FullNamePipe implements PipeTransform {

  transform(user: User): string {
    return `${user.firstname} ${user.surname}`;
  }

}
