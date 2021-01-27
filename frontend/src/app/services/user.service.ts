import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { User } from 'src/app/classes/user'
import { HttpClient } from '@angular/common/http'
import { lexicaURL } from '../lexica.properties'
import { Progress } from '../classes/progress'
import { map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public  readonly emptyUser  = new User('', '', '', '', '')
  private userSource          = new BehaviorSubject(this.emptyUser)

  public constructor(private readonly http: HttpClient) {
    this.refreshUserSource()
  }

  private refreshUserSource(): void {
    this.http.get<User>(`${lexicaURL}/user/${this.userSource.value.id}`)
      .subscribe(user => this.userSource.next(User.deserialize(user)))
  }

  // ToDo: Implement real login logic (in backend too)
  public login(email: string, password: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${lexicaURL}/user`).pipe(
      map(users => users.find(u => u.email === email && u.password === password)),
      tap(user => {
        if (user) { this.userSource.next(user) }
        else {
          this.userSource.error('Bad login')
          this.userSource = new BehaviorSubject(this.emptyUser)
        }
      }))
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
}
