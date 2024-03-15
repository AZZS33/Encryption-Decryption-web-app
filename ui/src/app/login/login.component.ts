import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { User } from '../_model/user'; // Import the User model
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,private userAuthService:UserAuthService,private router:Router
    
  ) {}
 Message:String="WELCOME TO EDS"
  ngOnInit(): void {}
  user!: User; // Create an instance of the User model
  public username: string = "";
  public password: string = "";

  login(loginForm: NgForm) {



    
    console.log("dnjsdakadsndsjdsjjadsjda:");

      console.log(`Username: ${this.username}, Password: ${this.password}`);
    
    console.log('Form Values:', loginForm.value);
    // this.userService.setUsername(loginForm.value.userName);
    // this.userService.setPassword(loginForm.value.userPassword);
    console.log('Form Values:', loginForm.value);
    console.log('Form Values:', loginForm.value);
    console.log('Form Values:', loginForm.value);
    console.log('Form Values:', loginForm.value);

    this.userService.login(loginForm.value).subscribe(
    



      (response: any) => {
        this.userService.setUsername(loginForm.value.userName);
        this.userService.setPassword(loginForm.value.userPassword);

        console.log(response);
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.role[0].roleName;
        
    
     




        this.router.navigate(['/home']);
       
      },
      (error: any) => {
        this.Message="Invaild email/password"
        console.log(error);
      }
    );
  }
}