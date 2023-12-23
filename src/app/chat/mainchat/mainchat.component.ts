import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { WebsocketService } from 'src/app/Service/websocket.service';

@Component({
  selector: 'app-mainchat',
  templateUrl: './mainchat.component.html',
  styleUrls: ['./mainchat.component.scss']
})
export class MainchatComponent implements OnInit{

  RoomName: string=""; //phòng chat đã join
  idRoom: string="";//id phòng chat
  constructor(){}
  ngOnInit(): void {
   
  }
}
