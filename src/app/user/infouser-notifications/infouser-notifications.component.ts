import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from 'src/app/Service/user.service';
import { PopupMessageService, isLogin } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-infouser-notifications',
  templateUrl: './infouser-notifications.component.html',
  styleUrls: ['./infouser-notifications.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InfouserNotificationsComponent implements OnInit{
  private dataSourceSubject = new BehaviorSubject<Notifications[]>([]);
  dataSource$ = this.dataSourceSubject.asObservable();
  // columnsToDisplay = ['Type', 'Message', 'Target', 'Date'];
  columnsToDisplay = ['Loại', 'Nội dung', 'Đối tượng', 'Thời gian'];
  dataSource: Notifications[]=[];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Notifications | null;
  constructor(private router: Router, private toast: ToastrService, private route: ActivatedRoute,private islogin: isLogin,
    private userService: UserService, private popUpmessage: PopupMessageService, private title: Title){}
  ngOnInit(): void {
    this.islogin.isLogin$.subscribe(result=>{
      if(result.status === true){
        const user= JSON.parse(result.user);
        const Id= user.id;
        this.title.setTitle(`${user.name} - Thông báo`);
        this.userService.getNotification(Id).subscribe((item:any[])=>{
          var list: Notifications[]=[];
          item.forEach(x=>{
            const data: Notifications={
              Type: (x.imagerarget.length>0)? 'Manga' : 'Notification',
              Message: x.message || 'N/A',
              Targetimage: x.imagerarget || '',
              Idtarget: x.target || '',
              Target: x.nametarget || 'N/A',
              Date: x.dateTime ? new Date(x.dateTime).toLocaleDateString() : 'N/A',
            };
            list.push(data);
          })
          this.dataSource= list;
        })
      }else{
        this.popUpmessage.showMessage('Vui lòng đăng nhập để sử dụng chức năng này');
      }
    })
  }
  infomanga(input: Notifications){
    if(input.Idtarget.length >0 && input.Target.length> 0){
      const name= input.Target.replace(/ /g, '-');
      this.router.navigate([`Manga/${input.Idtarget}/${name}`]);
    }
    else{
      this.toast.error('Đã xảy ra lỗi');
    }
  }
}
export interface Notifications {
  Type: string;
  Message: string;
  Targetimage: string;
  Idtarget: string;
  Target: string;
  Date: string;
}
