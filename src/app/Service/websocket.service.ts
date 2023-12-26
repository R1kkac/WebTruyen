import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Closed_chat, ListDataChatRoom, NewChat, PopupMessageService, RoomChat, UserJustCreate, UserJustLeave, UsersInRoom, isDisConnect_socket, isHubConnected, isLogin } from './repositores/injectable';
import { WebsiteServiceService } from './website-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnInit{

  public connection!: signalR.HubConnection;
  user: any;
  token='';
  constructor(
    private isHubCon: isHubConnected,
    private islogin: isLogin,
    private roomChat: RoomChat,
    private popUpmessage: PopupMessageService,
    private usersInRoom: UsersInRoom,
    private userJustCreate: UserJustCreate,
    private userJustLeave: UserJustLeave,
    private newChat: NewChat,
    private listData: ListDataChatRoom,
    private router: Router,
    private closed_chat: Closed_chat,
    private isDis_socket: isDisConnect_socket) { }
    ngOnInit(): void {
      this.islogin.isLogin$.subscribe(login=>{
        if(login.status === true){
          this.user= JSON.parse(login.user);
          this.token= login.token;
        }
      })
    }
  //Kết nối wwebsocket, khởi động ngay khi chạy ứng dụng {xem thêm tại app.modulo.ts}
  public startconection=()=>{
    this.islogin.isLogin$.subscribe(login=>{
        if(login.status === true){
          this.user= JSON.parse(login.user);
          this.token= login.token;
        }
      })
      this.connection= new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7132/Notification`,{ accessTokenFactory: () =>this.token })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();
    
      // onreconnected và onreconnecting xem thêm{https://devblogs.microsoft.com/dotnet/announcing-signalr-for-asp-net-core-2-0/}
      //tiến hành kết nối websocket với server, sau khi kết nối xong gọi các cổng kết nối  this.SignalR()
      this.connection
      .start()
      .then(()=> {console.error('Bắt đầu kết nối');
      if(this.connection.state=== signalR.HubConnectionState.Connected){
        this.isHubCon.HubState(true);
        console.warn("It Has connected to the hub");
      }
      console.log(this.connection.connectionId);
      console.log(this.connection.state);
      setTimeout(() => {
        this.SignalR();
      }, 0);
    })
    .catch(()=> {
      // if(this.connection.state === signalR.HubConnectionState.Disconnected){
      //   if(confirm("Vui lòng đăng nhập để sử dụng chức năng này")) {
      //     console.log("Implement delete functionality here");
      //   }
      // }
      // console.log(this.connection.state);
    });

    this.connection.onreconnecting(() => {
      console.log("Reconnecting...");
    });
  
    this.connection.onreconnected(connectionId => {
        console.log(`Reconnected with connectionId: ${connectionId}`);
    });
    // Xử lý các sự kiện khi mất kết nối
    this.connection.onclose(error => {
      if (error) {
          console.error(`Connection closed due to error: ${error}`);
      } else {
          console.log("Connection closed");
      }
    });
    
  }
  //Các cổng kết nối
  public SignalR=()=>{
      this.connection.on('list_room_chat_active', (result: any)=>{
        this.roomChat.pushRoomChat(result);
      });
      this.connection.on('notification', (result:any)=>{
        console.log(result);
        if(result.length>0){
          this.popUpmessage.showMessage(result);
        }
      });
      this.connection.on('cur_users_in_room', result=>{
        this.usersInRoom.pushData(result);
      });
      this.connection.on('user_in_room', (result: any)=>{
        console.warn(result); 
        this.userJustCreate.pushData(result);
      });
      this.connection.on('cur_users_leave_room', result=>{
        this.userJustLeave.pushData(result);
      });
      this.connection.on('new_data_chat', result=>{
        this.newChat.pushData(result);
      });
      this.connection.on('data_room_chat', result=>{
        console.error(result);
        this.listData.pushData(result);
      });
      this.connection.on('close_room_chat', result=>{
        if(result.length >0){
          this.popUpmessage.showMessage(result);
          setTimeout(() => {
            this.router.navigate(['']);
          }, 4000);
        }
      });
      this.connection.on('isdisconnect', result=>{
        this.isDis_socket.pushData(result);
      });
  }
  public listRoomChatActive(){
    this.connection.invoke('listRoomChatActive').catch((err:any)=>{console.log(err)});
  }
  public createChatRoom(room: any){
    this.connection.invoke('createChatRoom', JSON.stringify(room)).catch(err=>{console.log(err)});
  }
  public getCurUsersInRoom(roomId: any){
    this.connection.invoke('GetCurUserInRoom', roomId).catch(err=>{console.log(err)});
  }
  public joinChatRoom(userdata: any, roomId: any){
    this.connection.invoke('userJoinChatRoom', JSON.stringify(userdata), roomId).catch(err=>{ console.log(err)});
  }
  public leaveChatRoom(userId: any, roomId: any){
    this.connection.invoke('userLeaveChatRoom', userId, roomId).catch(err=>{ console.log(err)});
  }
  public ChatToRoom(userId: any, roomId: any, message: any){
    this.connection.invoke('UserChatToRoom', userId, roomId, message).catch(err=>{console.log(err)});
  }
  public GetDataChat(roomId: any){
    this.connection.invoke('GetDataChat', roomId).catch(err=>{console.log(err)});
  }
}
