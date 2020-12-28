import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { User } from 'src/app/classes/user'
import { HttpClient } from '@angular/common/http'
import { lexicaURL } from '../lexica.properties'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public readonly  emptyUser  = new User('', '', '', '')
  private readonly userSource = new BehaviorSubject(this.emptyUser)
  public constructor(private readonly http: HttpClient) {
    this.refreshUserSource()
  }

  private refreshUserSource(): void {
    this.http.get<User[]>(`${lexicaURL}/user`)
      .subscribe(users => this.setUser(User.deserialize(users[0])))
  }

  public setUser(user: User): void {
    this.userSource.next(user)
  }

  public get user(): Observable<User> {
    this.refreshUserSource()
    return this.userSource.asObservable()
  }
}
