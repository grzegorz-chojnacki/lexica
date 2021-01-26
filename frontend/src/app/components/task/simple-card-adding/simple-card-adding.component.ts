import { Component, OnInit, Inject } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SimpleCard } from 'src/app/classes/task'

@Component({
  selector: 'app-task-adding',
  templateUrl: './simple-card-adding.component.html',
  styleUrls: ['./simple-card-adding.component.scss']
})
export class SimpleCardAddingComponent implements OnInit {
  public readonly simpleCard = this.formBuilder.group({
    foreignWord: this.card.foreignWord,
    nativeWord: this.card.nativeWord
  })

  public constructor(
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly card: SimpleCard) { }

  public ngOnInit(): void { }
}
