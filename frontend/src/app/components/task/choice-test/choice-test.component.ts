import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-choice-test',
  templateUrl: './choice-test.component.html',
  styleUrls: ['./choice-test.component.scss']
})
export class ChoiceTestComponent implements OnInit {
  public favoriteSeason!: string
  public seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  public constructor() { }

  public ngOnInit(): void {
  }

}
