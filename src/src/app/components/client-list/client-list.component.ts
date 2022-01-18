import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { DetectorService } from 'src/app/services/detector.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit, AfterViewInit {

  displayedColumns = [ "id", "appKey"];
  dataSource = new MatTableDataSource<Client>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private clientService: ClientService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.loadClients();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadClients() {
    this.clientService.getClients().subscribe(c => this.dataSource.data = c);
  }

  addClient() {
    this.dialogService.openAddClientDialog()
      .afterClosed()
      .subscribe(() => this.loadClients());
  }
}
