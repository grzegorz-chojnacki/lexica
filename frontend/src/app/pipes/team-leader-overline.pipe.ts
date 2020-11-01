import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../classes/user';

@Pipe({
  name: 'teamLeaderOverline'
})
export class TeamLeaderOverlinePipe implements PipeTransform {

  transform(leader: User): string {
    return `${leader.firstname} ${leader.surname}`;
  }

}
