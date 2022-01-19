import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() toggleClick = new EventEmitter<any>();

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

  toggle() {
    this.toggleClick.emit();
  }

  get userinfo() {
    const claims = this.authService.getClaims() as {family_name: string, email:string, given_name: string};
    return claims ? `${claims.given_name} ${claims.family_name} (${claims.email})` : null;
  }
}
