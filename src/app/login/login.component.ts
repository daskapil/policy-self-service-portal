import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  isLoggedIn: boolean = false;
  errorMsg: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password; 
    this.isLoading = true;

    this.authService.login(email, password).subscribe(
      responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/user']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.errorMsg = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();    
  }

}
