import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  username: string = '';
  userEmail: string = '';
  userFirstName: string = '';
  newPassword: string = '';
  token!: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const tokenParam = this.route.snapshot.queryParamMap.get('token');
  console.log(tokenParam);
  console.log(tokenParam);

  console.log(tokenParam);

    if (tokenParam !== null) {
      this.token = tokenParam;
      const decodedToken = this.decodeToken(this.token);
  
      this.username = decodedToken.sub;
      this.userEmail = decodedToken.userEmail;
      this.userFirstName = decodedToken.userFirstName;
    }
  }
  

  updatePassword(updatePasswordForm: NgForm): void {
    console.log(updatePasswordForm.value.user);
      this.userService.resetPassword(this.token, updatePasswordForm.value.user).subscribe(
        (response: any) => {
          console.log('Password reset successful', response);
          // Redirect or show a success message
          this.router.navigate(['/home']);
        },
        (error: any) => {
          console.error('Error resetting password', error);
          // Handle errors, show error messages, etc.
        }
      );
   
  }

  private decodeToken(token: string): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(token);
  }
}
