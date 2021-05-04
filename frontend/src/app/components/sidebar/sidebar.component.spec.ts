import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { MatNavList } from '@angular/material/list'
import { RouterTestingModule } from '@angular/router/testing'
import { FullNamePipe } from 'src/app/pipes/full-name.pipe'

import { SidebarComponent } from './sidebar.component'

describe('SidebarComponent', () => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatIconModule,
      ],
      declarations: [
        MatNavList,
        FullNamePipe,
        SidebarComponent,
      ]
    }).compileComponents()
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
