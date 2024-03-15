import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Message:String="";
  constructor(private userService:UserService,private router:Router){

  }
  
  ngOnInit(): void {
  }




  
  register(registerForm:NgForm){



    this.userService.checkUsernameAvailability(registerForm.value.userName).subscribe(
      (isAvailable: boolean) => {
        if (isAvailable) {
          registerForm.value.userPP=registerForm.value.userPassword;
          // Username is available, you can proceed with registration
          this.userService.register(registerForm.value).subscribe(

            (response)=>{
              console.log(response);
          this.router.navigate(["/login"]);
            },
            (error)=>{
          console.log(error);

            }
          
          
          
          );
          console.log("availble")
        } else {
          this.Message="Username is not available ";
          // Username is not available, display an error message or take appropriate action
          console.log("not avalible")

        }
      },
      (error) => {
        // Handle any errors, such as network issues
      }
    );

  
  }



}