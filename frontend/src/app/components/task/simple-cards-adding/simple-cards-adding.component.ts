import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { SimpleCardAddingComponent } from 'src/app/components/task/simple-card-adding/simple-card-adding.component'
import { SimpleCard } from 'src/app/classes/task'
@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-cards-adding.component.html',
  styleUrls: ['./simple-cards-adding.component.scss']
})
export class SimpleCardsAddingComponent implements OnInit {

  public obce!: string
  public narodowe!: string
  public simpleCards: SimpleCard[] = []
  public constructor(private readonly dialog: MatDialog) { }



  public ngOnInit(): void { }

  public submit(): void {
  }
  public delete(): void {
  }
  public addSimpleCard(): void {
    const dialogRef = this.dialog.open(SimpleCardAddingComponent, { width: '500px',
    height: '500px', data: { obce: this.obce, narodowe: this.narodowe}, hasBackdrop: false})

    dialogRef.afterClosed().subscribe(result => {
      this.simpleCards.push(new SimpleCard(result.obce, result.narodowe))
    })
   }
}
