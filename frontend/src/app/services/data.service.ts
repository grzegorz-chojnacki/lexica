import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly storage = sessionStorage
  public readonly defaultMessage = 'foreignWord'

  private messageSource = new BehaviorSubject(this.setOption())
  public currentMessage = this.messageSource.asObservable()

  public constructor() { }

  public changeMessage(message: string): void {
    this.storage.setItem('mes', message)
    this.messageSource.next(message)
  }

  private setOption(): string | null {
    if (this.storage.getItem('mes')) { return this.storage.getItem('mes') }
    else { return this.defaultMessage }
  }
}
