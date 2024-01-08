import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { UserJustCreate, UserJustLeave, UsersInRoom, cur_room_chat } from 'src/app/Service/repositores/injectable';
import { UserChatRoom } from 'src/app/Service/repositores/interface';
import { WebsocketService } from 'src/app/Service/websocket.service';

@Component({
  selector: 'app-listuseractive',
  templateUrl: './listuseractive.component.html',
  styleUrls: ['./listuseractive.component.scss']
})
export class ListuseractiveComponent implements OnInit, OnDestroy{

  listuser: any[]=[];
  private listUserActive=new BehaviorSubject<any>(null);
  userData$ = this.listUserActive.asObservable();
  private subscription!: Subscription;
  constructor(private route: ActivatedRoute, private webSocket: WebsocketService, private UsersInRoom: UsersInRoom,
    private userJustCreate: UserJustCreate, private userJustLeave: UserJustLeave){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(x=>{
      const roomId= x.get('roomId');
      this.listuser=[];
      if(this.subscription){
        this.subscription.unsubscribe();
      }
      this.webSocket.getCurUsersInRoom(roomId);
      this.subscription= this.UsersInRoom.UsersroomchatData$.subscribe(users=>{
        if(users){
          var user= this.Mapper(users);
          //this.listuser =  user;
          this.listuser = this.listuser.filter(existingUser => !user.some(newUser => newUser.Id === existingUser.Id))
          .concat(user);
        }
      });
      this.userJustCreate.UserschatData$.subscribe(item => {
        var user = this.Mapper2(item);
        // Kiểm tra xem người dùng đã tồn tại trong mảng hay chưa
        const existingUser = this.listuser.find(u => u.Id === user.Id);
        if (!existingUser) {
          this.listuser.push(user);
        }
      });
      this.userJustLeave.UserschatLeaveData$.subscribe(item=>{
        const exitstingUser= this.listuser.findIndex(u=> u.Id == item.id);
        if(exitstingUser !== -1){
          this.listuser.splice(exitstingUser, 1);
        }
      })
      this.listuser = this.listuser.filter((item, index, self) => self.indexOf(item) === index);
    });
  }
  Mapper(input: any): UserChatRoom[] {
    return input.map((item: any) => {
      return {
        Id: item.id,
        Name: item.name,
        Avatar: item.avatar
      } as UserChatRoom;
    });
  }
  Mapper2(input: any) {
    return {
      Id: input.id,
      Name: input.name,
      Avatar: input.avatar
    } as UserChatRoom;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
