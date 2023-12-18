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

  constructor(private cookie: CookieService, private http: HttpClient,private CookieService: CookieService,
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
    if(input != undefined){
      if(typeof(input) === 'string')
      {
        var a= Number.parseInt(input);
        return a.toLocaleString();
      }
      return input.toLocaleString();
    }
    return 'N/A';
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
        isLogout: false,
        token: token,
        user: user
      }
      this.isLogin.sendData(cookievalue);
    }  
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
  avatar(input: any){
    const check=this.checkExitstImage(input);
    if(check === true ){
      return input;
    }else{
      return `https://ui-avatars.com/api/?name=${input}&background=random`;
    }
  }
  reverseString(input : string): string{
    const a= input.split('').reverse().join('');
    return a;
  }
  //kiểm tra xem đầu vào có phai hình ảnh không 
  checkExitstImage(input: string): boolean{
    const image= ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'ico'];
    //biểu thức chính quy {chatGPT}
    const isImage = new RegExp(`\\.(${image.join('|')})$`, 'i').test(input);

    if (isImage) {
      return true;
    } else {
      return false;
    }
  }
  //Xuất hiện trên đầu
  scrolltoTop(){
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  //Xuất hiện ngay tại vị trí đó
  scrollToLocation_instant(input: any){
    input.scrollIntoView({behavior: 'instant'});
  }
  //Cuộn đến đó
  scrollToLocation_Smooth(input: any){
    input.scrollIntoView({behavior: 'smooth'});
  }
  //lưu lịch sử xem truyện vào LocalStorage
  addHistory(manga: any){
    this.deleteHistoryExpired();
    const historyStore= localStorage.getItem('read_manga_history');
    if(historyStore){
      var datahistory: manga_history[]= JSON.parse(historyStore);
      const checkIsRead= datahistory.findIndex(x=> x.id == manga.mangaId);
      if(checkIsRead !== -1){
        const datenow: Date= new Date();
        datahistory[checkIsRead].date = datenow.toLocaleDateString();
        localStorage.setItem('read_manga_history', JSON.stringify(datahistory));
      }else{
        const datenow: Date= new Date();
        const a: manga_history={
          id: manga.mangaId,
          image: manga.mangaImage,
          name: manga.mangaName,
          date: datenow.toLocaleDateString()
        }
        datahistory.push(a);
        localStorage.setItem('read_manga_history', JSON.stringify(datahistory));
      }
    }
    else{
      var datahistory: manga_history[]= [];
      const datenow: Date= new Date();
        const a: manga_history={
          id: manga.mangaId,
          image: manga.mangaImage,
          name: manga.mangaName,
          date: datenow.toLocaleDateString()
      }
      datahistory.push(a);
      localStorage.setItem('read_manga_history', JSON.stringify(datahistory));
    }
  }
  //Trả về danh sách lịch sử đọc
  getHistory(){
    const history= localStorage.getItem('read_manga_history');
    if(history){
      const listdata: manga_history[]= JSON.parse(history);
      return listdata;
    }else{
      return null;
    }
  }
  //Xóa lịch sử chỉ giữ lại tối đa 50 truyện
  deleteHistoryExpired(){
    const history= localStorage.getItem('read_manga_history');
    if(history){
      const listdata: manga_history[]= JSON.parse(history);
      const count= listdata.length;
      if(count >50){
        const isValidDate = (dateString: string) => !isNaN(Date.parse(dateString));

        const newList = listdata
        .filter(item => isValidDate(item.date))
        .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
        .slice(0,50);
        localStorage.setItem('read_manga_history', JSON.stringify(newList));
      }
    }
  }
  //Lưu vị trí đọc của chương truyện vào LocalStorage
  writeIndexReadManga(manga_id: any, chapter_id: any, cur_index: number, chapter_length: number){
    const store_name= 'index_read_chapter_history';
    var Store= localStorage.getItem(store_name);
    if(Store){
      var listData: index_history_read_chapter[]= JSON.parse(Store);
      const manga_index= listData.findIndex(x=> x.id_m && x.id_ct == chapter_id);
      if(manga_index !== -1){
        const time= new Date().toLocaleDateString().toString();
        listData[manga_index].cur_index = cur_index;
        listData[manga_index].time = time;
        listData[manga_index].num_of_data = chapter_length;
        localStorage.setItem(store_name, JSON.stringify(listData));
      }else{
        const data: index_history_read_chapter={
          id_m: manga_id,
          id_ct: chapter_id,
          cur_index: cur_index,
          num_of_data: chapter_length,
          time: new Date().toLocaleDateString().toString(),
        }
        listData.push(data);
        localStorage.setItem(store_name, JSON.stringify(listData));
      }
    }else{
      var listData: index_history_read_chapter[]= [];
      const data: index_history_read_chapter={
        id_m: manga_id,
        id_ct: chapter_id,
        cur_index: cur_index,
        num_of_data: chapter_length,
        time: new Date().toLocaleDateString().toString(),
      }
      listData.push(data);
      localStorage.setItem(store_name, JSON.stringify(listData));
    }
  }
  //lấy index đọc của manga
  readIndexReadManga(manga_id: any, chapter_id: any){
    const store_name= 'index_read_chapter_history';
    const storeData= localStorage.getItem(store_name);
    if(storeData){
      const listData: index_history_read_chapter[]= JSON.parse(storeData);
      const cur_manga= listData.findIndex(x=> x.id_m== manga_id && x.id_ct == chapter_id);
      if(cur_manga !== -1){
        return listData[cur_manga];
      }
      else{
        return null;
      }
    }else{
      return null;
    }
  }
  //Xóa inex_read khi người dùng đọc xong
  removeIndexReadManga(manga_id: any, chapter_id: any){
    const store_name= 'index_read_chapter_history';
    const storeData= localStorage.getItem(store_name);
    if(storeData){
      const listData: index_history_read_chapter[]= JSON.parse(storeData);
      const manga_index= listData.findIndex(x=> x.id_m == manga_id && x.id_ct== chapter_id);
      if( manga_index !== -1){
        listData.splice(manga_index, 1);
        localStorage.setItem(store_name, JSON.stringify(listData));
        return true;
      }
      else{
        return false;
      }
    }else{
      return false;
    }
  }
  //Tùy chỉnh thời gian
  formatdatetime(input: any){
    let [day, month, year]= input.split('/');
    let date= new Date(`${month}/${day}/${year}`).toLocaleDateString();
    return date;
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
  private isLoginSubject= new BehaviorSubject<cookie>({status : false,isLogout: false, token :'', user:''});
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
@Injectable({
  providedIn: 'root',
})
export class CurPage {
  private curPageSubject = new Subject<number>();

  message$ = this.curPageSubject.asObservable();

  pushpage(page: number): void {
    this.curPageSubject.next(page);
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
  isLogout: boolean;
  token: string;
  user: string;
}
export interface manga_history{
  id: string;
  image: string;
  name: string;
  date: string;
}
export interface index_history_read_chapter{
  id_m: string;
  id_ct: string;
  cur_index: number;
  num_of_data:number;
  time:string;
}