import { Component, OnInit } from '@angular/core';
import { RoomChat, isHubConnected } from 'src/app/Service/repositores/injectable';
import { WebsocketService } from 'src/app/Service/websocket.service';

@Component({
  selector: 'app-listroomchat',
  templateUrl: './listroomchat.component.html',
  styleUrls: ['./listroomchat.component.scss']
})
export class ListroomchatComponent implements OnInit{

  listroomchat: any;
  constructor(private RoomsChat: RoomChat,private webSocket: WebsocketService
    ){}
  ngOnInit(): void {
    this.webSocket.listRoomChatActive();
    this.RoomsChat.roomchatData$.subscribe(result=>{
      this.listroomchat= result['Rooms'];
    })
  }
}
