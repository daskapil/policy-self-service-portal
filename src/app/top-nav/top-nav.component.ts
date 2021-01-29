import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  isAuthenticated = false;
  userSub = new Subject<User>();
  
  constructor(
    private authService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
      }
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  
  onLogout() {
    this.authService.logout();
  }
}
