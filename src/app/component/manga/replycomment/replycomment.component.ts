import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';
import { WebsiteServiceService } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-replycomment',
  templateUrl: './replycomment.component.html',
  styleUrls: ['./replycomment.component.scss']
})
export class ReplycommentComponent implements OnInit, OnChanges{

  @Input() comment!: any;
  @Input() isResetComment!: boolean;
  Danhsach :any;
  constructor(private userService: UserService){}
  ngOnInit(): void {
    // console.error("Vào List Reply");
    //console.log(this.isResetComment)
    this.userService.layDanhSachPhanHoiBinhLuan(this.comment.idComment).subscribe((res: any[])=>{
      this.Danhsach= res;
      this.Danhsach = this.Danhsach.sort((a: any, b: any) => {
        const dateA = new Date(this.convertDateString(a.dateReply));
        const dateB = new Date(this.convertDateString(b.dateReply));
        
        return dateB.getTime() - dateA.getTime();
    });
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur  = JSON.stringify(chng.currentValue);
      if(Boolean(cur)== true){
        this.userService.layDanhSachPhanHoiBinhLuan(this.comment.idComment).subscribe((res: any[])=>{
          this.Danhsach= res;
          this.Danhsach = this.Danhsach.sort((a: any, b: any) => {
            const dateA = new Date(this.convertDateString(a.dateReply));
            const dateB = new Date(this.convertDateString(b.dateReply));
            
            return dateB.getTime() - dateA.getTime();
        });
        })
      }
    }
  }
  convertDateString(dateString: string): string {
    // Chuyển đổi định dạng "8:22 19-12-2023" thành "19-12-2023 8:22"
    const formattedDateString = dateString.split(' ').reverse().join(' ');
    return formattedDateString;
  }
}
