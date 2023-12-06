import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subject } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class WebsiteServiceService {
  private apiUrl='https://nafami.online/Services';
  private privateKey='testwebtruyentranhangularvsaspapi';
  public JWTCookie='SSID'; //token user
  public UserCookie='CurrentUser'; //current user
  constructor(private cookie: CookieService) { }
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
    // async DeleteCookie(){
    //     this.cookie.deleteAll(); 
    //     this.user.updateUserInfo('','','','','');
    //   return await true;
    // }
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
