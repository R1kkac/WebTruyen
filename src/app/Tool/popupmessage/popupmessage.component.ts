import { Component, OnInit } from '@angular/core';
import { PopupMessageService } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-popupmessage',
  templateUrl: './popupmessage.component.html',
  styleUrls: ['./popupmessage.component.scss']
})
export class PopupmessageComponent implements OnInit{
  message: string | null = null;

  constructor(private popupMessageService: PopupMessageService) { }

  ngOnInit(): void {
    this.popupMessageService.message$.subscribe((message) => {
      this.message = message;
      setTimeout(() => {
        this.message = null;
      }, 3000); // Ẩn thông báo sau 3 giây
    });
  }
}
