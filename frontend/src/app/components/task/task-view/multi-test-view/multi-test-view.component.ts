import { Component, OnInit, Input } from '@angular/core'
import { Task } from 'src/app/classes/task'
import { MultiTest } from 'src/app/classes/example'
import { TaskViewComponent } from '../task-view'
import { MatDialog } from '@angular/material/dialog'
import { TaskSummaryComponent } from '../../task-summary/task-summary.component'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'


@Component({
  selector: 'app-multi-test-view',
  templateUrl: './multi-test-view.component.html',
  styleUrls: ['./multi-test-view.component.scss']
})
export class MultiTestViewComponent extends TaskViewComponent implements OnInit {
  @Input() public task!: Task<MultiTest>
  public correctAnswer!: Array<string>
  public correctAnswers!: Array<string[]>
  public fruits: Array<string> = []
  public fruitsA: Array<string> = []
  public selectedFruitsValue!: Array<string>
   public nestedForm!: FormGroup
  public readonly knewList = new Array<MultiTest>()
  public constructor(private readonly dialog: MatDialog,
                     private readonly formBuilder: FormBuilder) { super() }


  public ngOnInit(): void {
    // correct answers added
    this.task.examples.filter(example => example.answers.forEach(a => example.decoys.push(a)))
    // random order of answers
    this.task.examples.filter(ex => ex.decoys.sort((a, b) => 0.5 - Math.random()))

    this.task.examples[0].decoys.forEach(e => this.fruits.push(e))
    this.task.examples[0].answers.forEach(e => this.fruitsA.push(e))
    this.nestedForm = this.formBuilder.group({
      favFruits: this.addFruitsControls()
    })
  }
  public addFruitsControls(): FormArray {
   const arr = this.fruits.map(element => {
    return this.formBuilder.control(false)
  })
   return this.formBuilder.array(arr)
  }

  get fruitsArray(): FormArray {
    return this.nestedForm.get('favFruits') as FormArray
  }

  public getSelectedFruitsValue(): void  {
    this.selectedFruitsValue = []
    this.fruitsArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedFruitsValue.push(this.fruits[i])
      }
    })
  }

  public licz(): void {
    let licznik = 0
    this.selectedFruitsValue.forEach(element => {
      if (this.fruitsA.includes(element)) { licznik++ }
      else { licznik = 0 }

    })
    if (licznik === this.fruitsA.length){
      console.log("wybrales poprawne"+ licznik)}else console.log("wybrales zle")
  }
    public sum(): void {
      for (let i = 0; i < this.task.examples.length; i++) {
        for (let x = 0; x < this.task.examples[i].answers.length; x++) {
      //   this.correctAnswer[i].forEach(
      //     x => {
      //       console.log(x)
      //     if (this.task.examples[i].answers.includes(x))
      //     {
      //     this.knewList.push(this.task.examples[i])
      //   }
      // })
      console.log(this.correctAnswers[i][x])
      if (this.task.examples[i].answers.includes(this.correctAnswers[i][x])) {
        this.knewList.push(this.task.examples[i])
      }
        }
    }

      this.dialog.open(TaskSummaryComponent, {
        disableClose: true,
        data: { knewList: this.knewList, task: this.task },
        width: '500px'
      }).afterClosed().subscribe(progress => this.onSubmit.emit(progress))
    }

}
