import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.scss']
})
export class AddClientDialogComponent implements OnInit {

  client?: Client;

  constructor(
    private clientService: ClientService,
    private dialogRef: MatDialogRef<AddClientDialogComponent>,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  
  createClient() {
    this.clientService.createClient().subscribe(c => this.client = c);
  }

  close() {
    this.dialogRef.close();
  }

  copyAppKey() {
    navigator.clipboard.writeText(this.client!.appKey).then(() => {
      this.messageService.showInfoMessage("App-Key copied to clipboard.");
    }, err => {
      this.messageService.showErrorMessage("App-Key could not be copied to clipboard.")
    });
    
  }

}
