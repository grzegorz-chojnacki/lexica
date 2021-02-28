import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { randomColor } from 'src/app/classes/utils'
import { UserService } from 'src/app/services/user.service'

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm = this.formBuilder.group({
    username:  new FormControl('', [ Validators.required,]),
    firstname: new FormControl('', [ Validators.required ]),
    surname:   new FormControl('', [ Validators.required ]),
    password:  new FormControl('', [ Validators.required ]),
    color:     randomColor()
  })

  public constructor(
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router) { }

  public ngOnInit(): void { }

  public registerUser(): void {
    this.userService.register(this.registerForm.value).subscribe(
      _ => this.router.navigate(['/workspace']),
      _ => this.registerForm.controls.password.setErrors({ error: true }))
  }
}
