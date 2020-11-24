import { Component, Input, OnInit } from '@angular/core'
import { Progress } from 'src/app/classes/progress'
import { User } from 'src/app/classes/user'

@Component({
  selector: 'app-member-list-item',
  templateUrl: './member-list-item.component.html',
  styleUrls: ['./member-list-item.component.scss']
})
export class MemberListItemComponent implements OnInit {
  // Can be used for team progress (with list of every progress in some team)
  // or for specific task (with only one progress in list)
  @Input() public progress!: Progress[]
  @Input() public user!: User

  public constructor() { }

  public ngOnInit(): void { }

  public getCompletion(): number {
    return this.progress.reduce(Progress.sum, 0) / this.progress.length
  }

}
