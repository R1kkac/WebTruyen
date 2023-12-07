import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsiteServiceService {
  private apiUrl='https://nafami.online/Services';
  private privateKey='testwebtruyentranhangularvsaspapi';
  public JWTCookie='SSID'; //token user
  public UserCookie='CurrentUser'; //current user

  constructor(private cookie: CookieService, private http: HttpClient, private route: Router) { }
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
  Getcookie(cookie: string){
    const value=this.decrypt(this.cookie.get(cookie));
    return value;
  }
  //Xóa cookie {dùng làm đăng xuất}
  async DeleteCookie(){
    this.cookie.deleteAll(); 
    //this.user.updateUserInfo('','','','');
  return await true;
  }
  //Lấy thông tin từ người dùng từ cookie {User}
  // GetUserCookie(){
  //   const cookiedata=this.Getcookie(this.UserCookie);
  //   //Kiểm tra cookie có null không và length của nó
  //   if(cookiedata !== null && cookiedata.length>0 ){
  //   const cookievalue= JSON.parse(cookiedata);
  //       if(cookievalue!=null){
  //           this.user._Id = cookievalue.id;
  //           this.user._Avatar = cookievalue.avatar;
  //           this.user._Name = cookievalue.name;
  //           this.user._Email = cookievalue.email;
  //           this.user._PhoneNumber = cookievalue.phoneNumber;
  //       }
  //       return this.user;
  //   }
  //   return this.user;
  // }
  // CurrentUser(){
  // var user= this.GetUserCookie();
  //   if(typeof user !== null || typeof user !== undefined){
  //     this.CurUser.senddata(user);
  //   }else{
  //     this.CurUser.senddata(null);
  //   }
  // }
  //Kiểm tra xem người dùng có đăng nhập chưa
  Canactive(){
    // if(this.user._Id.length> 0){
    //   return true;
    // }
    return this.route.navigate(['']);
  }
  //Lấy danh sách thông báo chưa đọc
  getNotification(id: string): Observable<any>{
    const  url= `${this.apiUrl}/DanhSachThongBaoChuaXem/${id}`;
    return this.http.get(url);
  }
  //Lấy danh sách truyện đã theo dõi
  danhSachTruyenTheoDoi(id: string): Observable<any>{
    const url= `${this.apiUrl}/DanhsachTheoDoi/${id}`;
    return this.http.get<any>(url);
  }
  //Thoe dõi truyện
  taoTheoDoiTruyen(IdUser: string, IdManga: string): Observable<any>{
    const url= `${this.apiUrl}/TheoDoiTruyen`;
    const fromdata= new FormData();
    fromdata.append('IdUser',IdUser);
    fromdata.append('IdManga',IdManga);
    return this.http.post(url,fromdata);
  }
  //Hủy theo dõi
  huyTheoDoitruyen(IdUser: string, IdManga: string): Observable<any>{
    const url= `${this.apiUrl}/HuyTheoDoi/${IdUser}/${IdManga}`;
    return this.http.delete(url);
  }
  //Đánh dấu thông báo là đã xem
  daXemthongbao(idNotification: string): Observable<any>{
    const url= `${this.apiUrl}/SeenNotification`;
    const fromdata= new FormData();
    fromdata.append('idNotification',idNotification);
    return this.http.post(url, fromdata);
  }
  binhLuanChuongTruyen(idUser: string, idChapter: string, message: string): Observable<any>{
    const url= `${this.apiUrl}/Comment`;
    const fromdata= new FormData();
    fromdata.append("IdUser", idUser);
    fromdata.append("IdChapter", idChapter);
    fromdata.append("CommentData", message);
    return this.http.post(url, fromdata);
  }
  layDanhSachBiinhLuan(IdChapter: string): Observable<any>{
    const url=`${this.apiUrl}/GetListComment/${IdChapter}`;
    return this.http.get(url);
  }
  phanHoiBinhLuan(idComment:string, idUserReply: string, data: string): Observable<any>
  {
    const url= `${this.apiUrl}/ReplyComment`;
    const fromdata= new FormData();
    fromdata.append("IdComment", idComment);
    fromdata.append("IdUserReply", idUserReply);
    fromdata.append("ReplyData", data);
    return this.http.post(url, fromdata);
  }
    layDanhSachPhanHoiBinhLuan(idComment: string): Observable<any[]>{
    const url=`${this.apiUrl}/ListReply/${idComment}`
    return this.http.get<any[]>(url);
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
export interface user{
  id: string;
  avatar: string;
  name: string;
  email: string;
}