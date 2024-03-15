import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { User } from '../_model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  [x: string]: any;
  PATH_OF_API = 'http://localhost:9092';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(loginData: any) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });

    
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    const resetPasswordRequest = { token, newPassword };
    return this.httpclient.post(this.PATH_OF_API + '/api/reset-password', {resetPasswordRequest}, {
      headers: this.requestHeader,
    });
  }
  
/////////////////////
forgotPassword(email: string): Observable<any> {
  return this.httpclient.post(this.PATH_OF_API + '/api/forgot-password', {email}, {
    headers: this.requestHeader,
  });
}
  //////////////////
  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles: string | any[]): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } 
          }}
        }
        return isMatch;
      }

      public register(registerData: any) {
        return this.httpclient.post(this.PATH_OF_API + '/registerNewUser', registerData, {
          headers: this.requestHeader,
        });
      }


 
  

          
      // (username: string) {
      //   const params = new HttpParams().set('username', username);
      //   return this.httpclient.get<boolean>(this.PATH_OF_API + '/check-username', { params });
      // }



      public checkUsernameAvailability(username: string) {
        // Use backticks to construct the URL with the username as a parameter
        return this.httpclient.get<boolean>(`${this.PATH_OF_API}/check-username/${username}`, { headers: this.requestHeader });

      }
      updateUser(updatedUser: any) {
        // Send a PUT request to the Spring Boot API to update user information
        return this.httpclient.put(`${this.PATH_OF_API}/${updatedUser.username}`, updatedUser);
      }


      setUsername(username: any): void {
        localStorage.setItem('username', username);

      }
    
      getUsername(): String {
        return localStorage.getItem('username')!;
      }
      setPassword(pass: any): void {
        localStorage.setItem('password', pass);      }
    
      getPassword(): String {
        return localStorage.getItem('password')!;
      }
      getUserByUsername(username: any): Observable<any> {
        return this.httpclient.get(`${this.PATH_OF_API}/${username}`);
      }

setThirdParty(N:any){
  localStorage.setItem('thirdParty', N);

}

getThirdParty(N:any){
  return localStorage.getItem('thirdParty');


}





    }



      
    
