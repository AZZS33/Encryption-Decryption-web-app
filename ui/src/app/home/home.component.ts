import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_model/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: String="nothing here yet";
  password: String="nothing here yet";  // Define a user property to store user data

  constructor(private UserService: UserService) {} // Inject the UserService

  ngOnInit(): void {
    // Retrieve the user data from the UserService
    this.username = this.UserService.getUsername();
    this.password = this.UserService.getPassword();
    console.log('google is ', localStorage.getItem('thirdParty'));
    console.log('User Information in HomeComponent:', this.username);
    
  }
}
