import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WebsiteServiceService {
  private privateKey='testwebtruyentranhangularvsaspapi';
  public JWTCookie='SSID'; //token user
  public UserCookie='SSUSER'; //current user

  constructor(private cookie: CookieService, private http: HttpClient, private route: Router,private CookieService: CookieService,
    private isLogin: isLogin) { }
  returnMangaUrl(idManga: any, nameManga:any){
    const name= nameManga.replace(/ /g, '-');
      return `/Manga/${idManga}/${name}`;
  }
  changeFormat(item: any){
    const data= item.replace(/ /g, '-');
    return data;
  }
  formatView(input: any){
    if(typeof(input) === 'string')
    {
      var a= Number.parseInt(input);
      return a.toLocaleString();
    }
    return input.toLocaleString();
  }
  formatDate(input: any, type: any){
    const inputDate = new Date(input);
    if (isNaN(inputDate.getTime())) {
      return input;
    }
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(inputDate, type);
  }
  showAndHideDisplayElement(classname: string){
    const element= document.querySelector(classname) as HTMLElement;
    if(window.getComputedStyle(element).getPropertyValue('display')=== 'none'){
      element.style.display = 'block';
    }else{
      element.style.display = 'none';
    }
  }
  //Mã hóa thông tin {để đảm bảo an toản cần ã hóa thông tin trước khi lưu vào cookie}
  encrypt( data: string){
    const Encrypt = CryptoJS.AES.encrypt(data, this.privateKey).toString();
    return Encrypt;
  }
  //Giải mã thông tin
  decrypt( data:string ){
    const Decrypt = CryptoJS.AES.decrypt(data, this.privateKey).toString(CryptoJS.enc.Utf8);
    return Decrypt;
  }
  //Lấy thông tin từ cookie sau đó giải mã
  Getcookie(){
    const token=this.decrypt(this.cookie.get(this.JWTCookie));
    const user=this.decrypt(this.cookie.get(this.UserCookie));
    if(token .length >0 && user.length> 0){
      const cookievalue : cookie={
        status: true,
        token: token,
        user: user
      }
      this.isLogin.sendData(cookievalue);
    }  
  }
  //Xóa cookie {dùng làm đăng xuất}
  async DeleteCookie(){
    this.cookie.deleteAll(); 
    //this.user.updateUserInfo('','','','');
    return await true;
  }
  //Tạo cookie chứa thông tin
  SetCookie(token: any, infouser: any){
    const cookieOptions = {
      expires: 7,
      domain: 'localhost',
      path: '/',
    };
    this.CookieService.set(this.JWTCookie, this.encrypt(token),cookieOptions); // Tạo cookie với dữ liệu mã hóa
    this.CookieService.set(this.UserCookie, this.encrypt(JSON.stringify(infouser)), cookieOptions); // Tạo cookie với dữ liệu mã hóa
  }
}
//thanh process bar
@Injectable({
  providedIn: 'root'
})
export class Processbar {

  private dataSubject= new BehaviorSubject<dataProcess>({curPro: 0, lengthPro :0});
  dataProcessbar$ = this.dataSubject.asObservable();

  sendData(number: number, length: number){
    const data: dataProcess ={curPro :number , lengthPro: length};
    this.dataSubject.next(data);
  }
}
export interface dataProcess{
  curPro: number;
  lengthPro: number;
}

//search data
@Injectable({
  providedIn: 'root'
})
export class SearchbyCategories {

  private SearchDataSubject= new Subject<any[]>();
  searchData$ = this.SearchDataSubject.asObservable();

  sendData(item: any){
    this.SearchDataSubject.next(item);
  }
}

@Injectable({
  providedIn: 'root'
})
export class isLogin{
  private isLoginSubject= new BehaviorSubject<cookie>({status : false, token :'', user:''});
  isLogin$ = this.isLoginSubject.asObservable();

  sendData(input: any){
    this.isLoginSubject.next(input);
  }
}
@Injectable({
  providedIn: 'root',
})
export class PopupMessageService {
  private messageSubject = new Subject<string>();

  message$ = this.messageSubject.asObservable();

  showMessage(message: string): void {
    this.messageSubject.next(message);
  }
}
export interface user{
  id: string;
  avatar: string;
  name: string;
  email: string;
}
export interface cookie{
  status: boolean;
  token: string;
  user: string;
}