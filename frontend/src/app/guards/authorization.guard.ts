import { Injectable } from '@angular/core'
import { CanActivate, UrlTree, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { UserService } from '../services/user.service'

type activation = Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree


@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  public constructor(
    private readonly userService: UserService,
    private readonly router: Router) { }

  public canActivate(): activation {
    if (!this.userService.logged) {
      this.router.navigate(['/'])
      return false
    } else { return true }
  }
}

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedGuard implements CanActivate {
  public constructor(
    private readonly userService: UserService,
    private readonly router: Router) { }

  public canActivate(): activation {
    if (this.userService.logged) {
      this.router.navigate(['/workspace'])
      return false
    } else { return true }
  }
}
