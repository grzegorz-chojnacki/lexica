import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/user'

const loggedUser: User = new User('imielog', 'nazwiskolog', 'emaillog')
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public constructor() { }

  public get LoggedUser(): User {
    return loggedUser
  }
}
