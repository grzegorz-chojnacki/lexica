import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { RouterTestingModule } from '@angular/router/testing'
import { UserService } from 'src/app/services/user.service'
import { StartViewComponent } from './start-view.component'

describe('StartViewComponent', () => {
  let component: StartViewComponent
  let fixture: ComponentFixture<StartViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
      ],
      declarations: [StartViewComponent],
      providers: [
        { provide: UserService, useValue: { get logged() { return false }} }
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StartViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should redirect to login url when user is not logged', () => {
    const userService = TestBed.inject(UserService)
    spyOnProperty(userService, 'logged').and.returnValue(false)

    expect(component.redirect()).toBe('/login')
  })

  it('should redirect to workspace url when user is already logged', () => {
    const userService = TestBed.inject(UserService)
    spyOnProperty(userService, 'logged').and.returnValue(true)

    expect(component.redirect()).toBe('/workspace')
  })
})
