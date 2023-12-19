import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-commenttemplate',
  templateUrl: './commenttemplate.component.html',
  styleUrls: ['./commenttemplate.component.scss']
})
export class CommenttemplateComponent implements OnInit{

  @Input() User!:any;
  @Input() comment!: any;
  @Input() IdChapter!:any;
  @Input() hasLogin!:boolean;

  @Output() DanSachBinhLuan: EventEmitter<any> = new EventEmitter();
  idComment = "";
  isComment= false;

  constructor(private userService: UserService){

  }
  ngOnInit(): void {

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
            this.DanSachBinhLuan.emit(res);
            setTimeout(() => {
              this.isComment=! this.isComment;
            }, 0);
          });
        }
      });   
    }
  }
}
