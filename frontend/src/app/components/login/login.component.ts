import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public email = ''
    public password = ''
    public invalid = false

    public constructor(private readonly router: Router) { }

    public ngOnInit(): void { }

    public loginUser(): void {
        console.log(this.password, this.email)
        if (this.password === 'lexica' && this.email === 'jkowalski@example.com') {
            this.router.navigateByUrl('/workspace')
        } else { this.invalid = true }
    }
}
