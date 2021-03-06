import { AbstractControl } from "@angular/forms"

export const randomColor = () => {
  const randomHex = () => '0123456789ACBDEF'[Math.floor(Math.random() * 16)]
  return '#' + new Array(6).fill(0).map(randomHex).join('')
}

type arrayNotEmptyResult = { arrayNotEmpty: { valid: boolean }} | null

export const arrayNotEmpty = (c: AbstractControl): arrayNotEmptyResult =>
  (c.value.length > 0) ? null : { arrayNotEmpty: { valid: false }}
