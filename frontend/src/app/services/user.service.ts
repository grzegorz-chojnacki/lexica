import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { User } from 'src/app/classes/user'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { lexicaURL } from '../lexica.properties'
import { Progress } from '../classes/progress'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public readonly emptyUser = new User('', '', '', '', '')
  private readonly storage = sessionStorage
  private userSource = new BehaviorSubject(this.loadSessionUser())

  public constructor(private readonly http: HttpClient) { }

  private loadSessionUser(): User {
    const sessionUser = this.storage.getItem('user')
    return sessionUser ? JSON.parse(sessionUser) : this.emptyUser
  }

  public authHeader(): { headers: HttpHeaders } {
    const user = this.loadSessionUser()
    return {
      headers: new HttpHeaders({
        authorization: 'Basic ' + btoa(`${user.email}:${user.password}`)
      }
    )}
  }

  private refreshUserSource(user: User = this.userSource.value): void {
    if (user !== this.emptyUser) {
      this.http.get<User>(`${lexicaURL}/user/${user.id}`, this.authHeader())
        .subscribe(
          u   => { this.saveUserWithPassword(u, user.password) },
          err => {
            this.storage.removeItem('user')
            this.userSource.error(err) // Reset userSource after error
            this.userSource = new BehaviorSubject<User>(this.emptyUser)
          })
    } else { return }
  }

  public login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${lexicaURL}/user/login`, { email, password })
      .pipe(tap(user => {
        if (user) { this.saveUserWithPassword(user, password) }
        else { throw new Error() }
      }))
  }

  private saveUserWithPassword(user: User, password: string): void {
    const userWithPassword = { ...user, password }
    this.storage.setItem('user', JSON.stringify(userWithPassword))
    this.userSource.next(User.deserialize(userWithPassword as User))
  }

  public logout(): void {
    this.storage.removeItem('user')
    this.userSource.next(this.emptyUser)
  }

  public setUser(user: User): void {
    this.http.put<Progress>(`${lexicaURL}/user/${user.id}`, user, this.authHeader())
      .subscribe(_ => this.refreshUserSource())
  }

  public addProgress(progress: Progress): Observable<Progress> {
    const userId = this.userSource.getValue().id
    return this.http.put<Progress>(
      `${lexicaURL}/user/${userId}/progress`,
      progress,
      this.authHeader())
  }

  public get user(): Observable<User> {
    this.refreshUserSource()
    return this.userSource.asObservable()
  }

  public get logged(): boolean { return this.userSource.value !== this.emptyUser }
}
