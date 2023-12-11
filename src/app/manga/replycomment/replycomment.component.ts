import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';
import { WebsiteServiceService } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-replycomment',
  templateUrl: './replycomment.component.html',
  styleUrls: ['./replycomment.component.scss']
})
export class ReplycommentComponent implements OnInit{
  @Input() IdComment: any;
  Danhsach :any;
  constructor(private userService: UserService){}
  ngOnInit(): void {
    // console.error("Vào List Reply");
    // console.error(this.IdComment);
    this.userService.layDanhSachPhanHoiBinhLuan(this.IdComment).subscribe((res: any[])=>{
      // console.log(res);
      this.Danhsach= res;
    })
  }
}
