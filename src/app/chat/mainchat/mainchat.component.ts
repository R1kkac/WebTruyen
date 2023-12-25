import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListDataChatRoom, NewChat, UserJustCreate, UserJustLeave, isLogin } from 'src/app/Service/repositores/injectable';
import { UserChatRoom } from 'src/app/Service/repositores/interface';
import { UserService } from 'src/app/Service/user.service';
import { WebsocketService } from 'src/app/Service/websocket.service';

@Component({
  selector: 'app-mainchat',
  templateUrl: './mainchat.component.html',
  styleUrls: ['./mainchat.component.scss']
})
export class MainchatComponent implements OnInit, OnDestroy{

  private userjoin!: Subscription;
  private userLeave!: Subscription;
  private newMessage!: Subscription;
  curRoomId:any;
  curUser:any;
  hasRoom=false;
  @ViewChild('fielddata') data!: ElementRef;
  constructor(private userJustJoin: UserJustCreate, private userJustLeave: UserJustLeave, private renderer: Renderer2,
    private route: ActivatedRoute, private isLogin: isLogin, private webSocket: WebsocketService, private newChat: NewChat,
    private Listdatachat: ListDataChatRoom){}
  ngOnInit(): void { 
    this.isLogin.isLogin$.subscribe(item=>{
      if(item.status === true){
        this.curUser= JSON.parse(item.user);
      }
    })
    this.route.paramMap.subscribe(item=>{
      const roomId= item.get('roomId');
      if(roomId){
        if(this.curRoomId != roomId){
          this.webSocket.leaveChatRoom(this.curUser.Id, this.curRoomId);
        }
        this.hasRoom= true;
        this.curRoomId= roomId;
        const element= this.data.nativeElement;
        element.innerHTML = '';

      }
    });
    if(this.userjoin && this.userLeave){
      this.userLeave.unsubscribe();
      this.userjoin.unsubscribe();
    }
    this.userjoin= this.userJustJoin.UserschatData$.subscribe(item=>{
    if(item){
      var user= this.Mapper(item);
      const message= '<i style="color: rgba(170, 170, 170, 0.8);">Đã tham gia phòng chat</i>';
      this.AddNotification(user, message);
    }
   });
   this.userLeave= this.userJustLeave.UserschatLeaveData$.subscribe(item=>{
    if(item){
      var user= this.Mapper(item);
      const message= '<i style="color: rgba(170, 170, 170, 0.8);">Đã rời khỏi phòng chat</i>';
      this.AddNotification(user, message);
    }
   });
   if(this.newMessage){
    this.newMessage.unsubscribe()
   }
   this.newChat.NewChatData$.subscribe(item=>{
    const user= this.Mapper(item);
    const message= item.messages;
    this.AddNotification(user, message);
   })
  }
  AddNotification(input: UserChatRoom, message: string){
    const data = this.data.nativeElement;
    const li = this.renderer.createElement('li');
    let newelement= `<div class="item-chat m-2" style="display: flex; align-items: center;">
        <div class="info" style="display: flex; align-items: center; padding-right: .25rem;">
                <img src="${input.Avatar}" alt="${input.Name}" style="width: 1.5rem; height: 1.5rem; border-radius: .75rem;">
            <span class="ms-1 me-2">${input.Name}</span>
            <span class="d-flex align-items-center ">:</span>
        </div>
        <div class="chat-data" style="display: block; width: auto; overflow: hidden; word-wrap: break-word;">
            <span>${message}</span>
        </div>
    </div>`;
    this.renderer.setProperty(li, 'innerHTML', newelement);
    //this.renderer.appendChild(data, li);
    this.renderer.insertBefore(data, li, data.firstChild);

  }
  chatToRoom(input: any){
    const message= input.target[0].value;
    this.webSocket.ChatToRoom(this.curUser.id, this.curRoomId, message);
  }
  Mapper(input: any) {
    return {
      Id: input.id,
      Name: input.name,
      Avatar: input.avatar
    } as UserChatRoom;
  }
  Mapper2(input: any): UserChatRoom[] {
    return input.map((item: any) => {
      return {
        Id: item.id,
        Name: item.name,
        Avatar: item.avatar
      } as UserChatRoom;
    });
  }
  getdata(){
    this.webSocket.GetDataChat(this.curRoomId);
  }
  ngOnDestroy(): void {
    this.webSocket.leaveChatRoom(this.curUser.Id, this.curRoomId);
      if(this.userjoin && this.userLeave && this.newMessage){
        this.userjoin.unsubscribe();
        this.userLeave.unsubscribe();
        this.newMessage.unsubscribe();
      }
  }

}
