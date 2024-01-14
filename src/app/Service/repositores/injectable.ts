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
  @Injectable({
    providedIn: 'root'
  })
  export class UsersInRoom{
    private UsersroomChatSubject= new Subject<any>();
    public UsersroomchatData$= this.UsersroomChatSubject.asObservable();
    public pushData(user: any){
      this.UsersroomChatSubject.next(user);
    }
  }
  @Injectable({
    providedIn: 'root'
  })
  export class UserJustCreate{
    private UsersChatSubject= new Subject<any>();
    public UserschatData$= this.UsersChatSubject.asObservable();
    public pushData(user: any){
      this.UsersChatSubject.next(user);
    }
  }
  @Injectable({
    providedIn: 'root'
  })
  export class UserJustLeave{
    private UsersChatLeaveSubject= new Subject<any>();
    public UserschatLeaveData$= this.UsersChatLeaveSubject.asObservable();
    public pushData(user: any){
      this.UsersChatLeaveSubject.next(user);
    }
  }
  @Injectable({
    providedIn: 'root'
  })
  export class NewChat{
    private NewChatSubject= new Subject<any>();
    public NewChatData$= this.NewChatSubject.asObservable();
    public pushData(user: any){
      this.NewChatSubject.next(user);
    }
  }
  @Injectable({
    providedIn: 'root'
  })
  export class ListDataChatRoom{
    private DataChatRoomSubJect= new Subject<any>();
    public ChatRoomData$= this.DataChatRoomSubJect.asObservable();
    public pushData(user: any){
      this.DataChatRoomSubJect.next(user);
    }
  }
  @Injectable({
    providedIn: 'root'
  })
  export class Closed_chat{
    private ClosedSubJect= new Subject<any>();
    public ClosedData$= this.ClosedSubJect.asObservable();
    public pushData(user: any){
      this.ClosedSubJect.next(user);
    }
  }
  @Injectable({
    providedIn: 'root'
  })
  export class isDisConnect_socket{
    private isDisSubject= new Subject<any>();
    public isDisData$= this.isDisSubject.asObservable();
    public pushData(user: any){
      this.isDisSubject.next(user);
    }
  }
  @Injectable({
    providedIn: 'root'
  })
  export class cur_room_chat{
    private isDisSubject= new BehaviorSubject<string>('');
    public isDisData$= this.isDisSubject.asObservable();
    public pushData(user: any){
      this.isDisSubject.next(user);
    }
  }
  @Injectable({
    providedIn: 'root'
  })
  export class isJoinChat{
    private isJoinChatSubject= new BehaviorSubject<number>(0);
    public isJoinChat$= this.isJoinChatSubject.asObservable();
    public pushData(user: number){
      this.isJoinChatSubject.next(user);
    }
  }
  @Injectable({
    providedIn: 'root'
  })
  export class Cur_User_In_Room{
    private curUserSubject= new Subject<any>();
    public curUser$= this.curUserSubject.asObservable();
    public pushData(data: any){
      this.curUserSubject.next(data);
    }
  }

  /// Manga
  


@Injectable({
  providedIn: 'root'
})
export class ResultSearchManga {

  private SearchmangatSubject= new BehaviorSubject<any[]>([]);
  SearchMangaData$ = this.SearchmangatSubject.asObservable();

    sendData(item: any[]){
    this.SearchmangatSubject.next(item);
  }
}
@Injectable({
  providedIn: 'root'
})
export class MangaDefault {

  private MangadefaultSubject= new BehaviorSubject<any[]>([]);
  MangaData$ = this.MangadefaultSubject.asObservable();

    sendData(item: any[]){
    this.MangadefaultSubject.next(item);
  }
}
@Injectable({
  providedIn: 'root'
})
export class DataCategories {

  private CategoriesSubject= new BehaviorSubject<any[]>([]);
  CategoriesData$ = this.CategoriesSubject.asObservable();

    sendData(item: any[]){
    this.CategoriesSubject.next(item);
  }
}
@Injectable({
  providedIn: 'root'
})
export class PageNumber {

  private PageNumberSubject= new BehaviorSubject<number>(0);
  PageNumberData$ = this.PageNumberSubject.asObservable();

    sendData(item: number){
    this.PageNumberSubject.next(item);
  }
}
@Injectable({
  providedIn: 'root'
})
export class Topmangadefault {

  private TopMangaSubject= new BehaviorSubject<number>(0);
  TopmangaData$ = this.TopMangaSubject.asObservable();

    sendData(item: number){
    this.TopMangaSubject.next(item);
  }
}
