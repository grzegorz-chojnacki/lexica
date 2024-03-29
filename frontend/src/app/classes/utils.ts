import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms'
import { Example } from './example'
import { Task } from './task'
import { Team } from './team'
import { saveAs } from 'file-saver'


export const randomColor = () => {
  const randomHex = () => '0123456789ACBDEF'[Math.floor(Math.random() * 16)]
  return '#' + new Array(6).fill(0).map(randomHex).join('')
}

type arrayNotEmptyResult = { arrayNotEmpty: { valid: boolean } } | null

export const arrayNotEmpty = (c: AbstractControl): arrayNotEmptyResult =>
  (c.value.length > 0) ? null : { arrayNotEmpty: { valid: false } }


const defaultTeam = () => ({ name: '', description: '', color: randomColor() })

export const teamFormInitializer =
  (formBuilder: FormBuilder, team = defaultTeam() as Team) => formBuilder.group({
    name: new FormControl(team.name, [Validators.required]),
    description: team.description,
    color: team.color
  })

export const saveAsFile = (task: Task<Example>) => {
  const blob = new Blob(
    [ JSON.stringify(task.examples, null, '  ') ],
    { type: 'text/plain;charset=utf-8' })
  saveAs(blob, `${task.name}.json`)
}
