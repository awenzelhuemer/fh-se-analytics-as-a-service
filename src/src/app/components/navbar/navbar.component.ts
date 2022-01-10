import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.signIn();
  }

  get isSignedIn(){
    return this.authService.isSignedIn();
  }

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl("/home");
  }

}
