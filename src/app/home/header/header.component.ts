import {Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { UserService } from 'src/app/Service/user.service';
import { isLogin } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  hasLogin: boolean =false;
  user: any;
  Notification: any[]=[];
  @ViewChild('toggler') toggler!: ElementRef;
  isToggle: boolean = false;
  private login!: Subscription;
  isShownotification: boolean = false;
  constructor(private isLogin: isLogin, private router: Router, private userService: UserService){}

  ngOnInit(): void {
    if(this.login){
      this.login.unsubscribe();
    }
    this.login = this.isLogin.isLogin$.subscribe((result: any)=>{
      if(result.status === true){
        this.hasLogin = true;
        const user= JSON.parse(result.user);
        this.user= user;
        this.userService.getNotification(user.id).subscribe((item: any)=>{
          //console.warn(item);
          this.Notification = item;
        });
      }
    });
  }
  islogout(islogout: boolean){
    this.hasLogin = islogout;
    this.router.navigate(['']);
  }
  showAndHideToggle(){
    const element= this.toggler.nativeElement;
    this.isToggle = !this.isToggle;
    if(this.isToggle === false){
      element.innerHTML = '<i class="fa-solid fa-bars" style="color: #ffffff;"></i>'
    }else if(this.isToggle === true){
      element.innerHTML = '<i class="fa-solid fa-xmark" style="color: #ffffff;"></i>';
    }
  }
  notificationunseen(){
    this.isShownotification = !this.isShownotification;
  }
  moreinfo(input: any){
    this.userService.daXemthongbao(input.id).subscribe({
      complete: ()=>{
        this.Notification.splice(
          this.Notification.findIndex(x=> x.id == input.id),1
        )
      },
    })
    const name= input.nametarget.replace(/ /g, '-');
    this.router.navigate([`/Manga/${input.target}/${name}`]);
  }
  ngOnDestroy(): void {
    this.login.unsubscribe();
  }
}
