import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PopupMessageService, isLogin } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-infouser',
  templateUrl: './infouser.component.html',
  styleUrls: ['./infouser.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: 0
      })),
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      transition('collapsed => expanded', animate('300ms ease-in')),
      transition('expanded => collapsed', animate('300ms ease-out'))
    ]),
    trigger('stagger', [
      state('void', style({ transform: 'translateY(-100%)', opacity: 0 })),
      transition(':enter', [
        animate('300ms ease-out', keyframes([
          style({ transform: 'translateY(0)', opacity: 0, offset: 0 }),
          style({ transform: 'translateY(-100%)', opacity: 1, offset: 1 })
        ]))
      ]),
      transition(':leave', [
        animate('300ms ease-in', keyframes([
          style({ transform: 'translateY(-100%)', opacity: 1, offset: 0 }),
          style({ transform: 'translateY(0)', opacity: 0, offset: 1 })
        ]))
      ])
    ])
  ]
})
export class InfouserComponent  implements OnInit{

  Id: any;
  Name: any;
  menu:  boolean = true;
  menuState: string = 'expanded';
  menuIconClass: string = 'fa-caret-down';

  items = [{id:'', name:'Thông tin tài khoản'}
  ,{id:'following', name: 'Danh sách truyện theo dõi'}
  ,{id:'history', name: 'Lịch sử đọc truyện'}
  ,{id:'notificatios', name: 'Thông báo'}
  ,{id:'', name: 'Lịch sử bình luận'}
  ,{id:'', name: 'Đăng ký trở thành dịch giả'}
  ,{id:'', name: 'Đăng xuất'}];

  constructor(private isLogin: isLogin, private route: ActivatedRoute, private popupmessage: PopupMessageService, private router:Router){
    this.isLogin.isLogin$.subscribe(item=>{
      if(item.status !== true && item.isLogout === false){
        this.popupmessage.showMessage('Vui lòng đăng nhập trước!');
        this.router.navigate(['']);
      }
      else if(item.status !== true && item.isLogout === true){
        this.router.navigate(['']);
      }
    })
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((item: ParamMap)=>{
      this.Id= item.get('userid');
      this.Name= item.get('usernam');
    })
  }
  routerlink(input: any){
    this.router.navigate([`user/${this.Id}/${this.Name}/${input}`]);
  }
  showandhidemenu(input: any){
    this.menu = !this.menu;
    this.menuState = this.menu ? 'expanded' : 'collapsed';
    this.menuIconClass = this.menu ? 'fa-caret-down' : 'fa-caret-right';

  }
}
