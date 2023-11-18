import {Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-hotkeymenu',
  templateUrl: './hotkeymenu.component.html',
  styleUrls: ['./hotkeymenu.component.scss']
})
export class HotkeymenuComponent implements OnInit{
  bufferValue=10;
  MoveEnter=false;
  leaveTimer: any;
  count=0;
  temporary=0;
  ex=false;
  listCategory: any[]=[]

  Categorys=[
      {type: 'Hành động'},
      {type: 'Trinh thám'},
      {type: 'Hài hước'},
      {type: 'Lãng mạng'},
      {type: 'Phiêu lưu'},
      {type: 'Huyền bí'},
      {type: 'Chuyển sinh'},
      {type: 'Thể thao'},
      {type: 'Harem'},
      {type: 'Trinh thám'},
      {type: 'Đời Thường'},
      {type: 'Ecchi'},
      {type: 'Khoa học viễn tưởng'},
      {type: 'Thám hiểm'}
  ]
  ngOnInit(): void {
    for(let i=0;i<4;i++){
      const items=this.DevideCategory();
      this.listCategory.push(items);
    }
    console.error(this.listCategory);
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
  DevideCategory(){
    const precount= this.count;
    const count=Math.floor(this.Categorys.length / 4);
    const count2= this.Categorys.length % 4;
    this.count= this.count + count;
    // nếu danh sách không chia hết cho 4 thì sẽ lấy phần dư phân bổ ra từng cột {load lần đầu vì temporary = 0, biến tạm ex để xác định}
    // là đã từng chia rồi tránh trường hợp temporary sau khi trừ còn 0 thì gọi lại lần nữa
    if(count2 !== 0 && this.temporary === 0 && this.ex ===false){
      this.temporary = count2 - 1;
      this.ex = true
      return this.Categorys.slice(precount,this.count + 1);
    }
    //load từ lần 2 trở di và temporary vẫn còn giá trị
    else if(count2 !== 0 && this.temporary !== 0 ){
      this.temporary = this.temporary - 1;
      return this.Categorys.slice(precount,this.count + 1);
    }
    //không có hoặc không còn temporary
    return this.Categorys.slice(precount,this.count);
  }
}
