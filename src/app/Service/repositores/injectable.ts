import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { cookie } from "./interface";

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

  //Chat-real-time
  @Injectable({
    providedIn: 'root'
  }) //kiểm tra hub đã kết nối chưa {đảm các cổng gọi dữ liệu chỉ gọi sau khi đã kết nối, bắt sự kiện refesh trang web sẽ tạo mới kết nối}
  export class isHubConnected{
    private datasubject= new BehaviorSubject<boolean>(false);
    public data$= this.datasubject.asObservable();
  
    public HubState(state: boolean){
      this.datasubject.next(state);
    }
  }
  @Injectable({
    providedIn: 'root'
  })
  export class RoomChat{
    private roomChatSubject= new Subject<any>();
    public roomchatData$= this.roomChatSubject.asObservable();
    public pushRoomChat(room: any){
      this.roomChatSubject.next(room);
    }
  }
  