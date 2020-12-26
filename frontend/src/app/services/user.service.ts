import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { User } from 'src/app/classes/user'
import { testUsers } from 'src/app/testData'
import { HttpClient } from '@angular/common/http'
import { lexicaURL } from '../lexica.properties'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userSource = new BehaviorSubject(testUsers[0])
  public constructor(private readonly http: HttpClient) {
    this.refreshUserSource()
  }

  private refreshUserSource(): void {
    this.http.get<User[]>(`${lexicaURL}/user`)
      .subscribe(users => this.setUser(users[0]))
  }

  public setUser(user: User): void {
    this.userSource.next(user)
  }

  public get user(): Observable<User> {
    this.refreshUserSource()
    return this.userSource.asObservable()
  }
}
