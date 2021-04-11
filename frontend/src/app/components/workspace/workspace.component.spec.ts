import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatMenuModule } from '@angular/material/menu'

import { WorkspaceComponent } from './workspace.component'
import { FullNamePipe } from 'src/app/pipes/full-name.pipe'


describe('WorkspaceComponent', () => {
  let component: WorkspaceComponent
  let fixture: ComponentFixture<WorkspaceComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatExpansionModule,
        MatDividerModule,
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatCardModule,
        MatMenuModule
      ],
      declarations: [
        WorkspaceComponent,
        FullNamePipe
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
