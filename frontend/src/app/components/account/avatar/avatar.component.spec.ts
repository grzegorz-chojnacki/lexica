import { ComponentFixture, TestBed } from '@angular/core/testing'
import { users } from 'src/app/test-data'
import { AvatarComponent } from './avatar.component'

describe('AvatarComponent', () => {
  let component: AvatarComponent
  let fixture: ComponentFixture<AvatarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvatarComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent)
    component = fixture.componentInstance
    component.user = users[0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
