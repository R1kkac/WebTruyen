import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { PopupMessageService, WebsiteServiceService, isLogin } from 'src/app/Service/website-service.service';
import { PopupmessageComponent } from 'src/app/Tool/popupmessage/popupmessage.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
  @ViewChild('comment') Comment!: ElementRef;

  User:any;
  IdChapter: any;
  IdManga: any;
  DanSachBinhLuan: any;
  idComment = "";
  isComment= false;
  hasLogin=false;
  constructor(private route: ActivatedRoute, private userService: UserService, private isLogin: isLogin, private popUpmessage: PopupMessageService,
    ){
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(route=>{
      this.IdChapter= route.get('idchapter');
      this.IdManga= route.get('id');
    })
    this.isLogin.isLogin$.subscribe((res:any)=>{
      this.hasLogin=res.status;
      if(res.status === true){
        const user= JSON.parse(res.user);
        this.User = user;
      }
     });
    this.userService.layDanhSachBinhLuan(this.IdChapter).subscribe((res: any)=>{
      // console.warn(res);
      this.DanSachBinhLuan= res;
    })
  }
  SendMessage(message: string, idUser: string){
    //kiểm tra xem người dùng login chưa
    if(this.hasLogin === false){
      this.popUpmessage.showMessage('Vui lòng đăng nhập để sử dụng chức năng này!');
    }else{
      this.userService.binhLuanChuongTruyen(idUser,this.IdManga, this.IdChapter, message).subscribe({
        complete: ()=>{
          this.userService.layDanhSachBinhLuan(this.IdChapter).subscribe((res: any)=>{
            // console.warn(res);
            this.DanSachBinhLuan= res;
          });
        }
      });
    }
  }
  ReplyComment(idComment: string){
    if(this.idComment==idComment && this.isComment==true){
      this.idComment="";
      this.isComment = !this.isComment;
    }else{
      this.idComment=idComment;
      this.isComment = !this.isComment;
    }
  }
  SenderReply(dataReplyComment: string, CurrentIdUserL: string, idComment: string){
    if(this.hasLogin === false){
      alert("Vui lòng đăng nhập để sử dụng chức năng này!");
    }else{
      this.userService.phanHoiBinhLuan(idComment,CurrentIdUserL,dataReplyComment).subscribe({
        complete: ()=>{
          this.userService.layDanhSachBinhLuan(this.IdChapter).subscribe((res: any)=>{
            // console.warn(res);
            this.DanSachBinhLuan= res;
            setTimeout(() => {
              this.isComment=! this.isComment;
            }, 0);
          });
        }
      });   
    }
  }
}
