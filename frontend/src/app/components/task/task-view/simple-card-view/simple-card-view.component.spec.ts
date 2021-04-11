import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { simpleCardTask } from 'src/app/test-data'
import { SimpleCardViewComponent } from './simple-card-view.component'

describe('SimpleCardViewComponent', () => {
  let component: SimpleCardViewComponent
  let fixture: ComponentFixture<SimpleCardViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatCardModule
      ],
      declarations: [SimpleCardViewComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleCardViewComponent)
    component = fixture.componentInstance
    component.task = simpleCardTask
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
