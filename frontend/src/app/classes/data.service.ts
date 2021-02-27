import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('1')
  public currentMessage = this.messageSource.asObservable()

  public constructor() { }

  public changeMessage(message: string): void {
    this.messageSource.next(message)
  }

}
