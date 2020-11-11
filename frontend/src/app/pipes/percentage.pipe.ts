import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  public transform(value: number): string {
    const text = `${Math.round(value)}%`
    return text.padStart(4, ' ')
  }

}
