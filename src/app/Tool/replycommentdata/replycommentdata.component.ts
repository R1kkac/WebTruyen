import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-replycommentdata',
  templateUrl: './replycommentdata.component.html',
  styleUrls: ['./replycommentdata.component.scss']
})
export class ReplycommentdataComponent {

  @Input() data!: any;
  report=false;
}
