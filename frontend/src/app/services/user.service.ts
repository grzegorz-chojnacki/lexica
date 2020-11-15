import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { User } from 'src/app/classes/user'
import { testUsers } from 'src/app/testData'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userSource = new BehaviorSubject(testUsers[0])
  public constructor() { }

  public setUser(user: User): void { this.userSource.next(user) }

  public get loggedUser(): Observable<User> {
    return this.userSource.asObservable()
  }
}
