import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/classes/user'

const loggedUser: User = new User('Imięużytkownika', 'Nazwiskoużytkownika', 'emailuzytkownia@adres.com')

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userSource = new BehaviorSubject<User>(new User('Gość', '', ''))
  public constructor() { }

  public setUser(user: User): void {
    this.userSource.next(user)
  }
  public get loggedUser(): Observable<User> {
    return this.userSource.asObservable()
  }
}
