import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signIn() {
    console.log("-- sign in --");
    this.authService.signIn();
  }

  get isSignedIn(){
    return this.authService.isSignedIn();
  }

  signOut() {
    this.authService.signOut();
  }

}
