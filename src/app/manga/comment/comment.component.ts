import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { PopupMessageService, isLogin } from 'src/app/Service/repositores/injectable';
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
      this.userService.layDanhSachBinhLuan(this.IdChapter).subscribe((res: any)=>{
        // console.warn(res);
        this.DanSachBinhLuan= res;
      })
    })
    this.isLogin.isLogin$.subscribe((res:any)=>{
      this.hasLogin=res.status;
      if(res.status === true){
        const user= JSON.parse(res.user);
        this.User = user;
      }
     });
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
  return(input: any){
    this.DanSachBinhLuan= input;
  }
}
