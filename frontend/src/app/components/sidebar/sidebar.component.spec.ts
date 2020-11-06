import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SidebarComponent } from './sidebar.component'
import { AccountComponent } from 'src/app/components/account/account.component'
import { TeamComponent } from 'src/app/components/team/team.component'

describe('SidebarComponent', () => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        AccountComponent,
        TeamComponent
      ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
