import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private static duration = 5000;

  constructor(private snackBar: MatSnackBar) { }

  showErrorMessage(message: string){
    console.error(message);
    return this.snackBar.open(message, undefined, { duration: MessageService.duration, panelClass: "message-error" });
  }

  showInfoMessage(message: string){
    return this.snackBar.open(message, undefined, { duration: MessageService.duration, panelClass: "message-info" });
  }
}
