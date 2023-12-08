import {Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataCategories } from 'src/app/Service/manga.service';
import { PopupMessageService, Processbar, WebsiteServiceService, isLogin } from 'src/app/Service/website-service.service';


@Component({
  selector: 'app-hotkeymenu',
  templateUrl: './hotkeymenu.component.html',
  styleUrls: ['./hotkeymenu.component.scss']
})
export class HotkeymenuComponent implements OnInit, OnChanges{
  MoveEnter=false;
  leaveTimer: any;
  count=0;
  temporary=0;
  ex=false;
  listCategory: any[]=[]
  private processbar !: Subscription;
  ProcessValue=0;



  Categories2: any[]=[];
  constructor(private bar: Processbar, private CategoriesService: DataCategories, private popUpService: PopupMessageService,
    private isLogin: isLogin, private router: Router){}
  ngOnInit(): void {
    const Categories= this.CategoriesService.CategoriesData$.subscribe(item=>{
      this.Categories2=item;
    })
    for(let i=0;i<4;i++){
      const items=this.DevideCategory(this.Categories2);
      this.listCategory.push(items);
    }
    this.processbar= this.bar.dataProcessbar$.subscribe((percent: any)=>{
      this.ProcessValue = (percent.curPro / percent.lengthPro) *100 +10;
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
      if(this.processbar){
        this.processbar.unsubscribe();
      }
      this.processbar= this.bar.dataProcessbar$.subscribe((percent: any)=>{
        this.ProcessValue = (percent.curPro / percent.lengthPro) *100 +5;
      })
  }
  Enter(){
    this.MoveEnter=true;
    clearTimeout(this.leaveTimer);
  }
  Leave(){
    this.leaveTimer = setTimeout(() => {
      this.MoveEnter = false;
    }, 100);
  }
  //hàm để phân chia dữ liệu cho các cột của category
  DevideCategory(Categories: any){
    const precount= this.count;
    const count=Math.floor(Categories.length / 4);
    const count2= Categories.length % 4;
    this.count= this.count + count;
    // nếu danh sách không chia hết cho 4 thì sẽ lấy phần dư phân bổ ra từng cột {load lần đầu vì temporary = 0, biến tạm ex để xác định}
    // là đã từng chia rồi tránh trường hợp temporary sau khi trừ còn 0 thì gọi lại lần nữa
    if(count2 !== 0 && this.temporary === 0 && this.ex ===false){
      this.temporary = count2 - 1;
      this.ex = true
      const temp= this.count;
      this.count +=1;
      return Categories.slice(precount,temp + 1);
    }
    //load từ lần 2 trở di và temporary vẫn còn giá trị
    else if(count2 !== 0 && this.temporary !== 0 ){
      this.temporary = this.temporary - 1;
      const temp= this.count;
      this.count +=1;
      return Categories.slice(precount,temp + 1);
    }
    //không có hoặc không còn temporary
    return Categories.slice(precount,this.count);
  }
  history(){
    this.isLogin.isLogin$.subscribe((result: any)=>{
      const a= result.status;
      if(a === false){
        this.popUpService.showMessage('Bạn cần phải đăng nhập để sử dụng chức năng này!');
      }
      if(a ===true){
        const user= JSON.parse(result.user);
        this.router.navigate([`user/${user.id}/${user.name}`]);
      }
    });
  }
  following(){
    this.isLogin.isLogin$.subscribe((result: any)=>{
      const a= result.status;
      if(a === false){
        this.popUpService.showMessage('Bạn cần phải đăng nhập để sử dụng chức năng này!');
      }
      if(a ===true){
        const user= JSON.parse(result.user);
        this.router.navigate([`user/${user.id}/${user.name}`]);
      }
    });
  }
}
