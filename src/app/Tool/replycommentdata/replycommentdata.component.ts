import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-replycommentdata',
  templateUrl: './replycommentdata.component.html',
  styleUrls: ['./replycommentdata.component.scss']
})
export class ReplycommentdataComponent {

  @Input() data!: any;
  report=false;
  constructor(private userService: UserService) {
    
  }
  reportreplycomment(input: any){
    setTimeout(() => {
      this.report= !this.report;
    }, 3000);
    this.userService.reportreplycomment(input).subscribe({
      next: (result: any)=>{
      
      }
    })
  }
}
