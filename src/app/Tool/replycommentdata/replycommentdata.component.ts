import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-replycommentdata',
  templateUrl: './replycommentdata.component.html',
  styleUrls: ['./replycommentdata.component.scss']
})
export class ReplycommentdataComponent {

  @Input() data!: any;
  report=false;
  constructor(private userService: UserService,private toastr: ToastrService) {
    
  }
  reportRepComment(IdReply: string) {
    this.userService.reportRepComment(IdReply).subscribe({
      next: (response) => {
        console.log('Bình luận đã được báo cáo');
        this.toastr.success('Bình luận đã được báo cáo thành công', 'Báo cáo');
      },
      error: (error) => {
        console.error('Lỗi khi báo cáo bình luận', error);
        this.toastr.error('Có lỗi xảy ra khi báo cáo bình luận', 'Lỗi');
      }
    });
  }

}
