import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-adsearch',
  templateUrl: './adsearch.component.html',
  styleUrls: ['./adsearch.component.scss']
})
export class AdsearchComponent implements OnInit{


  Categories=[
    {id: '1' , name: 'Hành động'},
    {id: '2' , name: 'Hài hước'},
    {id: '3' , name: 'Đời thường'},
    {id: '4' , name: 'Lãng mạng'},
    {id: '5' , name: 'Tình cảm'},
    {id: '6' , name: 'Trinh thám'},
    {id: '7' , name: 'Khoa học viễn tưởng'},
    {id: '8' , name: 'Phiêu lưu'},
    {id: '9' , name: 'Kinh dị'},
    {id: '10' , name: 'Harem'},
  ]
  count=0;
  temporary=0;
  ex=false;
  listCategory: any[]=[]
  selectedCategories: any[] = [];

  constructor(private builder: FormBuilder){}
  ngOnInit(): void {
    for(let i=0;i<4;i++){
      const items=this.DevideCategory();
      this.listCategory.push(items);
    }
    const searchForm= this.builder.group({
      list: this.builder.control('')
    });
  }
  getSelectedItems() {
    return this.selectedCategories
      .map(categoryGroup => categoryGroup.filter((item:any) => item.selected))
      .flat();
  }
  search(){
    const a=this.getSelectedItems();
    console.log(a);
  }
  DevideCategory(){
    const precount= this.count;
    const count=Math.floor(this.Categories.length / 4);
    const count2= this.Categories.length % 4;
    this.count= this.count + count;
    // nếu danh sách không chia hết cho 4 thì sẽ lấy phần dư phân bổ ra từng cột {load lần đầu vì temporary = 0, biến tạm ex để xác định}
    // là đã từng chia rồi tránh trường hợp temporary sau khi trừ còn 0 thì gọi lại lần nữa
    if(count2 !== 0 && this.temporary === 0 && this.ex ===false){
      this.temporary = count2 - 1;
      this.ex = true
      const temp= this.count;
      this.count +=1;
      return this.Categories.slice(precount,temp + 1);
    }
    //load từ lần 2 trở di và temporary vẫn còn giá trị
    else if(count2 !== 0 && this.temporary !== 0 ){
      this.temporary = this.temporary - 1;
      const temp= this.count;
      this.count +=1;
      return this.Categories.slice(precount,temp + 1);
    }
    //không có hoặc không còn temporary
    return this.Categories.slice(precount,this.count);
  }
}
