import { Component, Input, OnInit } from '@angular/core'
import { Progress } from 'src/app/classes/progress'
import { Example, Task } from 'src/app/classes/task'
import { User } from 'src/app/classes/user'

@Component({
  selector: 'app-team-progress',
  templateUrl: './team-progress.component.html',
  styleUrls: ['./team-progress.component.scss']
})
export class TeamProgressComponent implements OnInit {
  @Input() public user!: User
  @Input() public tasks!: Task<Example>[]

  public constructor() { }

  public ngOnInit(): void { }

  public getAverageProgress(): number {
    if (this.user.progress.length > 0) {
      return Math.floor(this.progressSum() / this.user.progress.length)
    } else { return 0 }
  }

  private progressSum(): number {
    return this.user.progress.reduce(Progress.sum, 0)
  }

  public getTeamProgress(): number {
    return Math.floor(this.progressSum() / this.tasks.length)
  }
}
