import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { SimpleCardAddingComponent } from 'src/app/components/task/simple-card-adding/simple-card-adding.component'
import { SimpleCard } from 'src/app/classes/task'
import { FormBuilder } from '@angular/forms'
import { TaskService } from 'src/app/services/task.service'
import { TeamService } from 'src/app/services/team.service'
import { Team } from 'src/app/classes/team'
import { Router, ActivatedRoute } from '@angular/router'
import { SimpleCardTask } from 'src/app/classes/task-type'
import { Location } from '@angular/common'

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-cards-adding.component.html',
  styleUrls: ['./simple-cards-adding.component.scss']
})
export class SimpleCardsAddingComponent implements OnInit {

  public team!: Team
  public obce!: string
  public narodowe!: string
  public simpleCards: SimpleCard[] = []
  public checkoutForm = this.formBuilder.group({
    team: this.team,
    name: '',
    description: '',
    examples: this.simpleCards,
    type: SimpleCardTask
  })

  public constructor(
    private readonly dialog: MatDialog,
    private taskService: TaskService,
    private teamService: TeamService,
    private formBuilder: FormBuilder,
    public router: Router,
    private readonly route: ActivatedRoute,
    private location: Location) { }



  public ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('teamId')
    this.teamService.getTeam(teamId)
      .subscribe(team => this.team = team)
  }

  public submit(): void {
    if (this.simpleCards.length !== 0 ) {
    this.checkoutForm.setValue({
      team: this.team,
      name: this.checkoutForm.get('name')?.value,
      description: this.checkoutForm.get('description')?.value,
      examples: this.simpleCards,
      type: SimpleCardTask
    })
    console.log(this.checkoutForm)
    this.taskService.createTask(this.checkoutForm.value)
    this.location.back()
  }
  }

public anuluj(): void {
  this.location.back()
}
  public delete(no: number): void {
    if (this.simpleCards.length > 0) {
      this.simpleCards.splice(no, 1)
    }
  }
  public edit(no: number): void {
    const dialogRef = this.dialog.open(SimpleCardAddingComponent, {
      width: '500px',
      height: '500px', data: {
        obce: this.simpleCards[no].foreignWord,
        narodowe: this.simpleCards[no].nativeWord
      }, hasBackdrop: false
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.obce.length === 0 || result.narodowe.length === 0) { }
      else {
        this.simpleCards[no].nativeWord = result.narodowe
        this.simpleCards[no].foreignWord = result.obce
      }
    })
  }
  public addSimpleCard(): void {
    const dialogRef = this.dialog.open(SimpleCardAddingComponent, {
      width: '500px',
      height: '500px', data: { obce: this.obce, narodowe: this.narodowe }, hasBackdrop: false
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.obce.length === 0 || result.narodowe.length === 0) { }
      else {
        this.simpleCards.push(new SimpleCard(result.obce, result.narodowe))
      }
    })
  }
}
