import { Component, Input, OnInit } from '@angular/core'
import { User } from 'src/app/classes/user'

@Component({
  selector: 'app-member-list-item',
  templateUrl: './member-list-item.component.html',
  styleUrls: ['./member-list-item.component.scss']
})
export class MemberListItemComponent implements OnInit {
  @Input() public member!: User

  public constructor() { }

  public ngOnInit(): void { }

}
