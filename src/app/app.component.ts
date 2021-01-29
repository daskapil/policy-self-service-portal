
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { UserDataService } from './services/data/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userDataSerive: UserDataService
  ) { }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.userDataSerive.onAutoLogin();
  }
  
}
