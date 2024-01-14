import {AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { MangaService } from 'src/app/Service/manga.service';
import { UserService } from 'src/app/Service/user.service';
import { PopupMessageService, ResultSearchManga, isLogin } from 'src/app/Service/repositores/injectable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy , AfterViewInit{
  hasLogin: boolean =false;
  user: any;
  Notification: any[]=[];
  @ViewChild('toggler') toggler!: ElementRef;
  @ViewChild('inputElement') search!: ElementRef;
  inputsearch: string='';
  result: any;
  isToggle: boolean = false;
  private login!: Subscription;
  isShownotification: boolean = false;
  constructor(private isLogin: isLogin, private router: Router, private userService: UserService, private popUpmessage: PopupMessageService,
    private mangaService: MangaService, private searchManga: ResultSearchManga,private renderer: Renderer2){}

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
  timkiem(input: any){
    setTimeout(() => {
      this.result=[];
      this.renderer.setProperty(this.search.nativeElement, 'value', '');
    }, 0);
    this.router.navigate(['Search']);
  }
  infomanga(input :any){
    const name= input.mangaName.replace(/ /g, '-');
    this.router.navigate([`/Manga/${input.mangaId}/${name}`]);
    setTimeout(() => {
      this.result=[];
      this.renderer.setProperty(this.search.nativeElement, 'value', '');
    }, 0);
  }
  ngAfterViewInit(): void {
    this.search.nativeElement.addEventListener('input',async (event: InputEvent)=>{
      if(this.inputsearch!=='')
      {
        this.mangaService.Mangasearch(this.inputsearch).subscribe((result:any)=>{
          this.result=result;
          this.searchManga.sendData(result);
        });
      }else{
        this.result = [];
      }
    })
  }
  enterevent(){
    setTimeout(() => {
      this.result=[];
      this.renderer.setProperty(this.search.nativeElement, 'value', '');
    }, 0);
  }
  ngOnDestroy(): void {
    this.login.unsubscribe();
  }
}
