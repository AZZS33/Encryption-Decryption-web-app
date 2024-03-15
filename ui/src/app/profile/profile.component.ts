import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_model/user';
import { FormsModule, NgForm } from '@angular/forms';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  
  
  username: String="nothing here yet";
  userEmail="nothing here yet";
  userPP="nothing here yet";
  password: String="nothing here yet";



  constructor(private userService: UserService,private userAuthService:UserAuthService,private router:Router){

}
ngOnInit(): void {



  
  
  this.username = this.userService.getUsername();
  this.password = this.userService.getPassword();
  console.log('User Information are:', this.username);


  this.userService.getUserByUsername(this.username)
    .subscribe(response => {
     this.userEmail=response.userEmail;
     this.userPP=response.userPP;
    

    });


    }

updateUser() {
  this.userService.updateUser(this.updateUser).subscribe(response => {
    console.log('User information updated successfully');
  });
}

register(registerForm:NgForm){



        this.userService.register(registerForm.value).subscribe(

          (response)=>{
            console.log(response);
            
        this.router.navigate(["/home"]);
          },
          (error)=>{
        console.log(error);

          }
        
      
  );


}

}
