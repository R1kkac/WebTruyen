import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';
import { WebsiteServiceService } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-replycomment',
  templateUrl: './replycomment.component.html',
  styleUrls: ['./replycomment.component.scss']
})
export class ReplycommentComponent implements OnInit{

  @Input() comment!: any;
  Danhsach :any;
  constructor(private userService: UserService){}
  ngOnInit(): void {
    // console.error("Vào List Reply");
    this.userService.layDanhSachPhanHoiBinhLuan(this.comment.idComment).subscribe((res: any[])=>{
      this.Danhsach= res;
    })
  }
}
