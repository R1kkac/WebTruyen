import { Component, OnInit } from '@angular/core';
import { RoomChat } from 'src/app/Service/repositores/injectable';
import { WebsocketService } from 'src/app/Service/websocket.service';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.scss']
})
export class ChatpageComponent implements OnInit{
  constructor(private websocket: WebsocketService, private roomChat: RoomChat){}
  ngOnInit(): void {
  }

}
