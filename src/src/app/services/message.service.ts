import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private static duration = 6000;

  constructor(private snackBar: MatSnackBar) { }

  showErrorMessage(error: string | {status: number}) {

    console.error(error);

    let message: string;

    if (typeof(error) === 'string') {
      message = error;
    } else if (error.status == 0) {
      message = "Can't connect to server.";
    } else if (error.status == 404) {
      message = "Entity does not exist."
    } else {
      message = `Error performing request, status code = ${error.status}`;
    }

    return this.showMessage(message, "message-error");
  }

  showInfoMessage(message: string) {
    return this.showMessage(message, "message-info");
  }

  private showMessage(message: string, cssClass: string) {
    return this.snackBar.open(message, undefined,
      { duration: MessageService.duration, panelClass: cssClass })
  }
}
