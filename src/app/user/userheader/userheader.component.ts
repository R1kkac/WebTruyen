import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.scss']
})
export class UserheaderComponent implements OnInit{

  @Input() user!: any;
  @Output() hasLogin: EventEmitter<any> = new EventEmitter();
  constructor(private userService: UserService, private router: Router){}
  ngOnInit(): void {
    console.log(this.user);
  }
  infouser(user: any){  
    this.router.navigate([`user/${user.id}/${user.name}`]);
  }
  logout(){
    this.userService.logout();
    this.hasLogin.emit(false);
  }
}
