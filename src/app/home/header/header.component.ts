import {Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { isLogin } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  hasLogin: boolean =false;
  user: any;
  private login!: Subscription;
  constructor(private isLogin: isLogin, private router: Router){}

  ngOnInit(): void {
    if(this.login){
      this.login.unsubscribe();
    }
    this.login = this.isLogin.isLogin$.subscribe((result: any)=>{
      if(result.status === true){
        this.hasLogin = true;
        const user= JSON.parse(result.user);
        this.user= user;
      }
    })
  }
  islogout(islogout: boolean){
    this.hasLogin = islogout;
    this.router.navigate(['']);
  }
  ngOnDestroy(): void {
    this.login.unsubscribe();
  }
}
