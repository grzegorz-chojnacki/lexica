import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { User } from 'src/app/classes/user'
import { HttpClient } from '@angular/common/http'
import { lexicaURL } from '../lexica.properties'
import { Progress } from '../classes/progress'

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
    if (user) {
      this.userSource.next(user)
    }
  }

  public addProgress(progress: Progress): Observable<Progress> {
    const userId = this.userSource.getValue().id
    return this.http.put<Progress>(`${lexicaURL}/user/${userId}/progress`, progress)
  }

  public get user(): Observable<User> {
    this.refreshUserSource()
    return this.userSource.asObservable()
  }
}
