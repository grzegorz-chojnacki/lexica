import { Component, Input, OnInit } from '@angular/core'
import { User } from 'src/app/classes/user'

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() public user!: User

  public constructor() { }

  public ngOnInit(): void { }

}
