import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { first } from 'rxjs/operators'

// import { AlertService, AuthenticationService } from '@/_services'

@Component({ templateUrl: './login.component.html',
styleUrls: ['./login.component.scss'] })

export class LoginComponent implements OnInit {
    public email!: string
    public password!: string
    public constructor(private router: Router) { }
    public ngOnInit(): void {
        this.email = ''
        this.password = ''
    }

    public loginUser(): void {
        console.log(this.password, this.email)
        if (this.password === 'lexica') {
            this.router.navigateByUrl('/workspace')
        }
    }
}
