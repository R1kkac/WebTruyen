import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { DataCategories } from 'src/app/Service/manga.service';
import { SearchbyCategories } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-adsearch',
  templateUrl: './adsearch.component.html',
  styleUrls: ['./adsearch.component.scss']
})
export class AdsearchComponent implements OnInit, OnDestroy{

  typeSearch=1;
  Categories:any;
  count=0;
  temporary=0;
  ex=false;
  ListCategoryhaveChecked:any[]=[];
  listCategory: any[]=[];
  private  Sub!: Subscription;
  constructor(private router: Router, private searchmanga: SearchbyCategories,private CategoriesService: DataCategories,private title: Title ){
    this.title.setTitle('Tìm kiếm - Yahallo');
  }
 
  ngOnInit(): void {
    if(this.Sub){
      this.Sub.unsubscribe();
    }
    this.Sub= this.CategoriesService.CategoriesData$.subscribe(item=>{
      this.Categories = item;
    })
    for(let i=0;i<4;i++){
      const items=this.DevideCategory(this.Categories);
      this.listCategory.push(items);
    }
  }
  search(){
    setTimeout(() => {
      this.searchmanga.sendData(this.ListCategoryhaveChecked);
    }, 0);
    this.router.navigate(['Tim-kiem-nang-cao/Ket-Qua']);
  }
  listChecked(data: any){
    if(this.ListCategoryhaveChecked.length>0){
      const index= this.ListCategoryhaveChecked.findIndex(item=> item.genreId == data.genreId);
      if(index != -1){
        this.ListCategoryhaveChecked.splice(index, 1);
      }else{
        this.ListCategoryhaveChecked.push(data);
      }
    }
    else{
      this.ListCategoryhaveChecked.push(data);
    }  
  }
    
  DevideCategory(data: any){
    const precount= this.count;
    const count=Math.floor(data.length / 4);
    const count2= data.length % 4;
    this.count= this.count + count;
    // nếu danh sách không chia hết cho 4 thì sẽ lấy phần dư phân bổ ra từng cột {load lần đầu vì temporary = 0, biến tạm ex để xác định}
    // là đã từng chia rồi tránh trường hợp temporary sau khi trừ còn 0 thì gọi lại lần nữa
    if(count2 !== 0 && this.temporary === 0 && this.ex ===false){
      this.temporary = count2 - 1;
      this.ex = true
      const temp= this.count;
      this.count +=1;
      return data.slice(precount,temp + 1);
    }
    //load từ lần 2 trở di và temporary vẫn còn giá trị
    else if(count2 !== 0 && this.temporary !== 0 ){
      this.temporary = this.temporary - 1;
      const temp= this.count;
      this.count +=1;
      return data.slice(precount,temp + 1);
    }
    //không có hoặc không còn temporary
    return data.slice(precount,this.count);
  }
  changeTypeSearch(type: number){
    this.typeSearch = type;
  }
  ngOnDestroy(): void {
    this.Sub.unsubscribe();
  }
}
