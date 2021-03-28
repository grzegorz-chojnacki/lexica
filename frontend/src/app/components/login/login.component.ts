import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { UserService } from 'src/app/services/user.service'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm = this.formBuilder.group({
    username: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [ Validators.required ]),
  })

  public constructor(
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router) { }

  public ngOnInit(): void { }

  public loginUser(): void {
    const { username, password } = this.loginForm.value
    this.userService.login(username, password).subscribe(
      _ => this.router.navigate(['/workspace']),
      _ => this.loginForm.controls.password.setErrors({ error: true }))
  }
}
