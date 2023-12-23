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
  @Output() resetComment: EventEmitter<boolean> = new EventEmitter();

  idComment = "";
  isComment= false;
  likecomment=0;
  dislikecomment=0;
  islike=false;
  isdislike=false;
  constructor(private userService: UserService){

  }
  ngOnInit(): void {
    //console.log(this.comment);
    this.likecomment = this.comment.likecomment ?? 0;
    this.dislikecomment= this.comment.dislikecomment ?? 0;
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
            this.resetComment.emit(true);
            setTimeout(() => {
              this.isComment=! this.isComment;
            }, 0);
          });
        }
      });   
    }
  }
  like(idcomment: any){
    if(this.islike == false){
      this.userService.LikeComment(idcomment).subscribe({
        error: (err:any)=>{     
        },
        complete: ()=>{
          this.likecomment +=1;
          this.islike = !this.islike;
        }
      })
    }else{
      this.userService.UnLikeComment(idcomment).subscribe({
        error: (err:any)=>{     
        },
        complete: ()=>{
          this.likecomment -=1;
          this.islike = !this.islike;
        }
      })
    }
 
  }
  unlike(idcomment: any){
    if(this.isdislike == false){
      this.userService.DisLikeComment(idcomment).subscribe({
        error: (err:any)=>{
          
        },
        complete: ()=>{
          this.dislikecomment +=1;
          this.isdislike = !this.isdislike;
        }
      })
    }else{
      this.userService.UnDisLikeComment(idcomment).subscribe({
        error: (err:any)=>{
          
        },
        complete: ()=>{
          this.dislikecomment -=1;
          this.isdislike = !this.isdislike;
        }
      })
    }
    
  }
}
