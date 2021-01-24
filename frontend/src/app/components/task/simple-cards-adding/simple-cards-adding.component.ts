import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { SimpleCardAddingComponent } from 'src/app/components/task/simple-card-adding/simple-card-adding.component'
import { SimpleCard } from 'src/app/classes/task'
import { FormBuilder } from '@angular/forms'
import { TaskService } from 'src/app/services/task.service'
import { Router, ActivatedRoute } from '@angular/router'
import { SimpleCardTask } from 'src/app/classes/task-type'
import { Location } from '@angular/common'

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-cards-adding.component.html',
  styleUrls: ['./simple-cards-adding.component.scss']
})
export class SimpleCardsAddingComponent implements OnInit {
  public foreign!: string
  public native!: string
  public simpleCards: SimpleCard[] = []
  public taskForm = this.formBuilder.group({
    name: '',
    description: '',
    examples: this.simpleCards,
    type: SimpleCardTask
  })
  public teamId!: string
  public taskId!: string

  public constructor(
    private readonly dialog: MatDialog,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    public router: Router,
    private readonly route: ActivatedRoute,
    public readonly location: Location) { }

  // ToDo: check if team exists
  public ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('teamId')
    const taskId = this.route.snapshot.paramMap.get('taskId')

    this.teamId = teamId as string

    this.taskService.getTask(teamId, taskId)
      .subscribe(task => {
        this.taskId = taskId as string
        this.taskForm.patchValue(task)
        this.simpleCards = task.examples
      })
  }


  public submit(): void {
    if (this.simpleCards.length !== 0) {
      this.taskForm.setValue({
        name: this.taskForm.get('name')?.value,
        description: this.taskForm.get('description')?.value,
        examples: this.simpleCards,
        type: SimpleCardTask
      })

      if (this.taskId) {
        this.taskService.updateTask(this.teamId, this.taskId, this.taskForm.value)
      } else {
        this.taskService.createTask(this.teamId, this.taskForm.value)
      }
    }
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
        foreign: this.simpleCards[no].foreignWord,
        native: this.simpleCards[no].nativeWord
      }, hasBackdrop: false
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.foreign.length === 0 || result.native.length === 0) { }
      else {
        this.simpleCards[no].nativeWord = result.native
        this.simpleCards[no].foreignWord = result.foreign
      }
    })
  }
  public addSimpleCard(): void {
    const dialogRef = this.dialog.open(SimpleCardAddingComponent, {
      width: '500px',
      height: '500px', data: { foreign: this.foreign, native: this.native }, hasBackdrop: false
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.foreign.length === 0 || result.native.length === 0) { }
      else {
        this.simpleCards.push(new SimpleCard(result.foreign, result.native))
      }
    })
  }
}
