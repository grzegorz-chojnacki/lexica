import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

export interface ConfirmationData {
  message: string
  buttonText: { ok: string, cancel: string }
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  public readonly message: string     = 'Czy na pewno chcesz kontynuować?'
  public readonly confirmText: string = 'Tak'
  public readonly cancelText: string  = 'Anuluj'

  public constructor(@Inject(MAT_DIALOG_DATA) data: ConfirmationData) {
    this.message     = data?.message            || this.message
    this.confirmText = data?.buttonText?.ok     || this.confirmText
    this.cancelText  = data?.buttonText?.cancel || this.cancelText
  }

  public ngOnInit(): void { }
}
