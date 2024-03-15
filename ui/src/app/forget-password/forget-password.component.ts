import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {


  user: string = '';
  message: string = '';
  constructor(private authService: UserService,private router:Router) {}

  onSubmit(registerForm: NgForm) {
    this.user = registerForm.value.userName;
    console.log('Request Payload:', { email: this.user });
  
    this.authService.forgotPassword(this.user).subscribe(
      response => {
        this.message="Email Sent Successfully";
        console.log('Password reset email sent successfully', response);
      },
      error => {
        this.message="Error sending password";

        console.error('Error sending password reset email', error);
        // Handle errors
      }
    );
  }
  
}




