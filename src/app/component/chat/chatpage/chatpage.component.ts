import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoomChat } from 'src/app/Service/repositores/injectable';
import { WebsiteServiceService } from 'src/app/Service/website-service.service';
import { WebsocketService } from 'src/app/Service/websocket.service';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.scss']
})
export class ChatpageComponent implements OnInit, OnDestroy{
  constructor(private websocket: WebsocketService, private roomChat: RoomChat, private wwebsiteService: WebsiteServiceService){}
  ngOnDestroy(): void {
    console.log('Kết thúc chat')
  }
  ngOnInit(): void {
    this.wwebsiteService.scrolltoTop();
  }

}
