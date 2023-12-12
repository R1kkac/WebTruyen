import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { WebsiteServiceService, isLogin } from './website-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private cookie: CookieService, private isLogin: isLogin, private websiteService: WebsiteServiceService,
    ) { }
  private ApiUrlUser='https://localhost:7132/Authentication';
  private ApiUrlService= 'https://localhost:7132/Services';

  login(username: any, password: any): Observable<any>{
    const url= `${this.ApiUrlUser}/Login`;
    const user: userlogin={
      username: username,
      password: password
    }
    return this.http.post(url,user);
  }
  logout(){
    this.cookie.delete(this.websiteService.JWTCookie, '/');
    this.cookie.delete(this.websiteService.UserCookie, '/');
    this.isLogin.sendData({status: false, isLogout: true, token:'', user: ''});
  }
  infouser(id : any): Observable<any>{
    const url= `${this.ApiUrlUser}/Infouser/${id}`;
    return this.http.get(url);
  }
  register(username: any, password: any,email: any): Observable<any>{
    const url= `${this.ApiUrlUser}/Register`;
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
    const url =`${this.ApiUrlUser}/Forgot-password`;
    const formdata= new FormData;
    formdata.append('email', JSON.stringify(email));
    return this.http.post(url, formdata);
  }
  resetpassword(email: any, token: any, newpassword: any):Observable< any>{
    const url=  `${this.ApiUrlUser}/Reset-password`;
    const formdata= new FormData;
    formdata.append('email', email);
    formdata.append('token', token);
    formdata.append('password', newpassword);
    return this.http.post(url, formdata);
  }
   //Lấy danh sách thông báo chưa đọc
   getNotification(id: string): Observable<any>{
    const  url= `${this.ApiUrlService}/DanhSachThongBaoChuaXem/${id}`;
    return this.http.get(url);
  }
  //Lấy danh sách truyện đã theo dõi
  danhSachTruyenTheoDoi(id: string): Observable<any>{
    const url= `${this.ApiUrlService}/DanhsachTheoDoi/${id}`;
    return this.http.get(url);
  }
  //Thoe dõi truyện
  taoTheoDoiTruyen(IdUser: string, IdManga: string): Observable<any>{
    const url= `${this.ApiUrlService}/TheoDoiTruyen`;
    const fromdata= new FormData();
    fromdata.append('IdUser',IdUser);
    fromdata.append('IdManga',IdManga);
    return this.http.post(url,fromdata);
  }
  //Hủy theo dõi
  huyTheoDoitruyen(IdUser: string, IdManga: string): Observable<any>{
    const url= `${this.ApiUrlService}/HuyTheoDoi/${IdUser}/${IdManga}`;
    return this.http.delete(url);
  }
  //Đánh dấu thông báo là đã xem
  daXemthongbao(idNotification: string): Observable<any>{
    const url= `${this.ApiUrlService}/SeenNotification`;
    const fromdata= new FormData();
    fromdata.append('idNotification',idNotification);
    return this.http.post(url, fromdata);
  }
  binhLuanChuongTruyen(idUser: string, idChapter: string, message: string): Observable<any>{
    const url= `${this.ApiUrlService}/Comment`;
    const fromdata= new FormData();
    fromdata.append("IdUser", idUser);
    fromdata.append("IdChapter", idChapter);
    fromdata.append("CommentData", message);
    return this.http.post(url, fromdata);
  }
  layDanhSachBinhLuan(IdChapter: string): Observable<any>{
    const url=`${this.ApiUrlService}/GetListComment/${IdChapter}`;
    return this.http.get(url);
  }
  phanHoiBinhLuan(idComment:string, idUserReply: string, data: string): Observable<any>
  {
    const url= `${this.ApiUrlService}/ReplyComment`;
    const fromdata= new FormData();
    fromdata.append("IdComment", idComment);
    fromdata.append("IdUserReply", idUserReply);
    fromdata.append("ReplyData", data);
    return this.http.post(url, fromdata);
  }
  layDanhSachPhanHoiBinhLuan(idComment: string): Observable<any[]>{
    const url=`${this.ApiUrlService}/ListReply/${idComment}`
    return this.http.get<any[]>(url);
  }
  danhGiaTruyen(Mangaid: any, start : any): Observable<any>{
    const url= `${this.ApiUrlService}/rating`;
    var fromdata= new FormData;
    fromdata.append('MangaId', Mangaid);
    fromdata.append('star', start);
    return this.http.post(url, fromdata);
  }
  ViewManga(MangaId: any): Observable<any> {
    const url = `${this.ApiUrlService}/CapNhatView/${MangaId}`;
    const fromdata= new FormData;
    fromdata.append('MangaId', MangaId);
    return this.http.post(url, fromdata);
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
