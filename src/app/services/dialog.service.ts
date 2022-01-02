import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDetectorDialogComponent } from '../components/edit-detector-dialog/edit-detector-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openEditDetectorDialog(detectorId: number) {
    return this.dialog.open(EditDetectorDialogComponent, { data: detectorId, minWidth: 400 });
  }
}
