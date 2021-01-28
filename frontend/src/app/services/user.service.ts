import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { User } from 'src/app/classes/user'
import { HttpClient } from '@angular/common/http'
import { lexicaURL } from '../lexica.properties'
import { Progress } from '../classes/progress'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public  readonly emptyUser = new User('', '', '', '', '')
  private readonly storage   = sessionStorage
  private userSource         = new BehaviorSubject(this.loadSessionUser())

  public constructor(private readonly http: HttpClient) { }

  private loadSessionUser(): User {
    const sessionUser = this.storage.getItem('user')
    return sessionUser ? JSON.parse(sessionUser) : this.emptyUser
  }

  private refreshUserSource(user: User = this.userSource.value): void {
    if (user !== this.emptyUser) {
      this.http.get<User>(`${lexicaURL}/user/${user.id}`)
        .subscribe(
          u => {
            this.storage.setItem('user', JSON.stringify(u))
            this.userSource.next(User.deserialize(u))
          },
          err => {
            this.storage.removeItem('user')
            this.userSource.error(err) // Reset userSource after error
            this.userSource = new BehaviorSubject<User>(this.emptyUser)
          })
    } else { return }
  }

  // ToDo: Implement real login logic (in backend too)
  public login(email: string, password: string): Observable<User[]> {
    const findUserIn = (users: User[]) => users
      .find(u => u.email === email /* && u.password === password */)

    return this.http.get<User[]>(`${lexicaURL}/user`)
      .pipe(tap(users => {
        const user = findUserIn(users)
        if (user) { this.refreshUserSource(user) }
        else { throw new Error() }
      }))
  }

  public logout(): void {
    this.storage.removeItem('user')
    this.userSource.next(this.emptyUser)
  }

  public setUser(user: User): void {
    this.http.put<Progress>(`${lexicaURL}/user/${user.id}`, { ...user, password: '123987dasjk'})
      .subscribe(_ => this.refreshUserSource())
  }

  public addProgress(progress: Progress): Observable<Progress> {
    const userId = this.userSource.getValue().id
    return this.http.put<Progress>(`${lexicaURL}/user/${userId}/progress`, progress)
  }

  public get user(): Observable<User> {
    this.refreshUserSource()
    return this.userSource.asObservable()
  }

  public get logged(): boolean { return this.userSource.value !== this.emptyUser }
}
