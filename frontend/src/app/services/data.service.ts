import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly storage   = sessionStorage

  private messageSource = new BehaviorSubject(this.opt())
  public currentMessage = this.messageSource.asObservable()

  public constructor(private readonly http: HttpClient) { }

  public changeMessage(message: string): void {
    this.storage.setItem('mes', message)
    this.messageSource.next(message)
  }

  private opt(): string | null {
    if( this.storage.getItem('mes')!==null)
    return this.storage.getItem('mes')
    else
    return '1'
  }


}
