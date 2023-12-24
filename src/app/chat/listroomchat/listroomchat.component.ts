import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupMessageService, RoomChat, isHubConnected, isLogin } from 'src/app/Service/repositores/injectable';
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
  constructor(private RoomsChat: RoomChat,private webSocket: WebsocketService,private router: Router,
    private isLogin: isLogin, private popUpMessage: PopupMessageService){}
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
    })
  }
  JoinRoomChat(room: any){
    if(room.roomId != this.preRoomId && this.preRoomId.length ==0)
    {
      if(this.curUser){
        this.webSocket.joinChatRoom(this.curUser, room.roomId)
        this.preRoomId = room.roomId;
      }
      
      setTimeout(() => {
        const a= room.roomName.replace(/ /g, '-');
        this.router.navigate([`c/room/${room.roomId}/${a}`]);
      }, 0);
    } 
    else if( room.roomId != this.preRoomId && this.preRoomId.length !=0){
      this.webSocket.leaveChatRoom(this.curUser.Id, this.preRoomId);
      if(this.curUser)
      {
        this.webSocket.joinChatRoom(this.curUser, room.roomId)
        this.preRoomId = room.roomId;
      }
      setTimeout(() => {
        const a= room.roomName.replace(/ /g, '-');
        this.router.navigate([`c/room/${room.roomId}/${a}`]);
      }, 0);
    }
    else{
      this.popUpMessage.showMessage('Bạn đã ở phòng này rồi');
    }
  }
}
