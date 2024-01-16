import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { WebsiteServiceService} from './website-service.service';
import { isLogin} from './repositores/injectable';
import { userlogin, register } from './repositores/interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private cookie: CookieService, private isLogin: isLogin, private websiteService: WebsiteServiceService,
    ) { }
  private ApiUrlUser='https://localhost:7132/Authentication';
  private ApiUrlService= 'https://localhost:7132/Services';
  private ApiComment='https://localhost:7132/Binh_Luan';

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
  edituser(user: any, avatar: File): Observable<any>{
    const url=  `${this.ApiUrlUser}/EditUser`;
    const formdata= new FormData;
    formdata.append('User', JSON.stringify(user));
    formdata.append('Avatar', avatar);
    return this.http.put(url, formdata);
  }
  changepassword(user: any){
    const url=  `${this.ApiUrlUser}/change_password_user`;
    const formdata= new FormData;
    formdata.append('User', JSON.stringify(user));
    return this.http.put(url, formdata);
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
  binhLuanChuongTruyen(idUser: string,idmanga: string, idChapter: string, message: string): Observable<any>{
    console.log("vào")
    const url= `${this.ApiUrlService}/Comment`;
    const fromdata= new FormData();
    fromdata.append("IdUser", idUser);
    fromdata.append("IdManga", idmanga);
    fromdata.append("IdChapter", idChapter);
    fromdata.append("CommentData", message);
    console.log(fromdata);
    return this.http.post(url, fromdata);
  }
  layDanhSachBinhLuan(mangaId: string,IdChapter: string): Observable<any>{
    const url=`${this.ApiUrlService}/GetListComment/${mangaId}/${IdChapter}`;
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
  getLikeAndUnLikeComment(idcomment: any): Observable<any>{
    const url = `${this.ApiUrlService}/get_like_and_unlike_comment/${idcomment}`;
    return this.http.get(url);
  }
  LikeComment(idcomment: any): Observable<any>{
    const url = `${this.ApiUrlService}/like_comment`;
    var fromdata= new FormData;
    fromdata.append('idcomment', idcomment);
    return this.http.post(url,fromdata);
  }
  DisLikeComment(idcomment: any): Observable<any>{
    const url = `${this.ApiUrlService}/dislike_comment`;
    var fromdata= new FormData;
    fromdata.append('idcomment', idcomment);
    return this.http.post(url,fromdata);
  }
  UnLikeComment(idcomment: any): Observable<any>{
    const url = `${this.ApiUrlService}/un_like_comment`;
    var fromdata= new FormData;
    fromdata.append('idcomment', idcomment);
    return this.http.post(url,fromdata);
  }
  UnDisLikeComment(idcomment: any): Observable<any>{
    const url = `${this.ApiUrlService}/un_dislike_comment`;
    var fromdata= new FormData;
    fromdata.append('idcomment', idcomment);
    return this.http.post(url,fromdata);
  }
  numberComment(mangaid: any): Observable<any>{
    const url = `${this.ApiUrlService}/comment_count/${mangaid}`;
    return this.http.get(url);
  }
  reportcomment(idcomment: any): Observable<any>{
    const url = `${this.ApiUrlService}/comment/report`;
    var fromdata= new FormData;
    fromdata.append('idcomment', idcomment);
    return this.http.post(url, fromdata);
  }
  reportreplycomment(idreply: any): Observable<any>{
    const url = `${this.ApiUrlService}/comment/reportreply`;
    var fromdata= new FormData;
    fromdata.append('idreply', idreply);
    return this.http.post(url, fromdata);
  }
  
  reportComment(idComment: string): Observable<any> {
    return this.http.get(`${this.ApiComment}/ReportComment`, { params: { idComment } });
  }

  reportRepComment(IdReply: string): Observable<any> {
    return this.http.get(`${this.ApiComment}/ReportRepComment`, { params: { IdReply } });
  }

}

