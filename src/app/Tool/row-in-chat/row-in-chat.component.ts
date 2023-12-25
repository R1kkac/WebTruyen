import { Component, Input, OnInit } from '@angular/core';
import { UserChatRoom } from 'src/app/Service/repositores/interface';

@Component({
  selector: 'app-row-in-chat',
  templateUrl: './row-in-chat.component.html',
  styleUrls: ['./row-in-chat.component.scss']
})
export class RowInChatComponent implements OnInit{
  @Input() User!: UserChatRoom;
  @Input() Message!: string;
  constructor(){
 
  }
  ngOnInit(): void {
    console.log('vào rowinchat')
    console.log(this.User)
    console.log(this.Message)
  }
}
