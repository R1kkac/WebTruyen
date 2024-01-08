import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Cur_User_In_Room, PopupMessageService, RoomChat, cur_room_chat, isHubConnected, isJoinChat, isLogin } from 'src/app/Service/repositores/injectable';
import { UserChatRoom } from 'src/app/Service/repositores/interface';
import { WebsocketService } from 'src/app/Service/websocket.service';

@Component({
  selector: 'app-listroomchat',
  templateUrl: './listroomchat.component.html',
  styleUrls: ['./listroomchat.component.scss']
})
export class ListroomchatComponent implements OnInit{

  listroomchat: any;
  preRoomId='';
  curUser:any;
  list_count_user:any;
  private numbersubject= new BehaviorSubject<number>(0);
  numberData$= this.numbersubject.asObservable();
  constructor(private RoomsChat: RoomChat,private webSocket: WebsocketService,private router: Router,
    private isLogin: isLogin,private cur_number_user: Cur_User_In_Room,private isJoinChat: isJoinChat,private popUpmessage: PopupMessageService){}
  ngOnInit(): void {
    this.isLogin.isLogin$.subscribe(item=>{
      if(item.status === true){
        const user= JSON.parse(item.user);
        const userchat: UserChatRoom={
          Id: user.id,
          Name: user.name,
          Avatar: user.avatar
        }
        this.curUser = userchat;
      }
    })
    this.webSocket.listRoomChatActive();
    this.RoomsChat.roomchatData$.subscribe(result=>{
      this.listroomchat= result['Rooms'];
    });
    this.cur_number_user.curUser$.subscribe(result=>{
      console.log(result)
      this.list_count_user= result;
    });
    this.isJoinChat.isJoinChat$.subscribe(
      {next: (value)=>{
        this.numbersubject.next(value);
      }},
    );
  }
  JoinRoomChat(room: any){
    const a= room.roomName.replace(/ /g, '-');
        this.router.navigate([`c/room/${room.roomId}/${a}`]);
  }
  returnuser(roomId: any){
    if(this.list_count_user){
      var usr= this.list_count_user.findIndex((x:any)=> x.roomId == roomId);
      if(usr != -1){
        return this.list_count_user[usr].numberuser;
      }else{
        return 0;
      }
    }
    return 0;
  }
}
