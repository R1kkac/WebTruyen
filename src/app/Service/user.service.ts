import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private ApiUrl='https://localhost:7132/Authentication';


  login(username: any, password: any): Observable<any>{
    const url= `${this.ApiUrl}/Login`;
    const user: userlogin={
      username: username,
      password: password
    }
    return this.http.post(url,user);
  }
  register(username: any, password: any,email: any): Observable<any>{
    const url= `${this.ApiUrl}/Register`;
    const register: register={
      UserName: username,
      Password: password,
      Email: email
    }
    const a= JSON.stringify(register);
    var fromdata= new FormData;
    fromdata.append('register', a)
    return this.http.post(url,fromdata);
  }
  forgotpassword(email: any): Observable<any>{
    const url =`${this.ApiUrl}/Forgot-password`;
    const formdata= new FormData;
    formdata.append('email', JSON.stringify(email));
    return this.http.post(url, formdata);
  }
  resetpassword(email: any, token: any, newpassword: any):Observable< any>{
    const url=  `${this.ApiUrl}/Reset-password`;
    const formdata= new FormData;
    formdata.append('email', email);
    formdata.append('token', token);
    formdata.append('password', newpassword);
    return this.http.post(url, formdata);
  }
}
export interface userlogin{
  username: string;
  password: string;
}
export interface register{
  UserName: string;
  Password: string;
  Email: string;
}
