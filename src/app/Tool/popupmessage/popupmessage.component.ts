import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopupMessageService } from 'src/app/Service/repositores/injectable';

@Component({
  selector: 'app-popupmessage',
  templateUrl: './popupmessage.component.html',
  styleUrls: ['./popupmessage.component.scss']
})
export class PopupmessageComponent implements OnInit{
  message: string | null = null;

  private Subscription!: Subscription;
  constructor(private popupMessageService: PopupMessageService) { }

  ngOnInit(): void {
    if(this.Subscription){
      this.Subscription.unsubscribe();
    }
    this.Subscription = this.popupMessageService.message$.subscribe((message) => {
      this.message = message;
      setTimeout(() => {
        this.message = null;
      }, 3000); // Ẩn thông báo sau 3 giây
    });
  }
}
