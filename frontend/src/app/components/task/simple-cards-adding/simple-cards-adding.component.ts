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
  public teamId!: string
  public taskId!: string
  public taskForm = this.formBuilder.group({
    name: '',
    description: '',
    examples: [],
    type: SimpleCardTask
  })

  public constructor(
    private readonly dialog: MatDialog,
    private readonly taskService: TaskService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    public  readonly router: Router,
    public  readonly location: Location) { }

  // ToDo: check if team exists
  public ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('teamId')
    const taskId = this.route.snapshot.paramMap.get('taskId')

    this.teamId = teamId as string

    this.taskService.getTask(teamId, taskId)
      .subscribe(task => {
        this.taskId = taskId as string
        this.taskForm.patchValue(task)
      })
  }


  public submit(): void {
    if (this.taskForm.value.examples.length > 0) {
      if (this.taskId) {
        this.taskService.updateTask(this.teamId, this.taskId, this.taskForm.value)
      } else {
        this.taskService.createTask(this.teamId, this.taskForm.value)
      }
    }
  }

  public delete(no: number): void {
    if (this.taskForm.value.examples.length > 0) {
      this.taskForm.value.examples.splice(no, 1)
    }
  }

  public edit(no: number): void {
    const dialogRef = this.dialog.open(SimpleCardAddingComponent, {
      width: '500px',
      height: '500px', data: {
        foreign: this.taskForm.value.examples[no].foreignWord,
        native: this.taskForm.value.examples[no].nativeWord
      }, hasBackdrop: false
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.foreign.length === 0 || result.native.length === 0) { }
      else {
        this.taskForm.value.examples[no].nativeWord = result.native
        this.taskForm.value.examples[no].foreignWord = result.foreign
      }
    })
  }

  public addSimpleCard(): void {
    const dialogRef = this.dialog.open(SimpleCardAddingComponent, {
      width: '500px',
      height: '500px', data: { foreign: '', native: '' }, hasBackdrop: false
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.foreign.length === 0 || result.native.length === 0) { }
      else {
        this.taskForm.value.examples.push(new SimpleCard(result.foreign, result.native))
      }
    })
  }
}
