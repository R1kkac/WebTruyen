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
}
export interface userlogin{
  username: string;
  password: string;
}
