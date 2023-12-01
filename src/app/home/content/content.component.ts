import { AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { MangaDefault, MangaService, PageNumber } from 'src/app/Service/manga.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy{

  page :number =0;
  data =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  data2: any[]=[];
  datafirstload: any[]=[];
  private Mangas!: Subscription;
  mangalist:any[]=[];
  constructor(private router: Router, private mangaDefault: MangaDefault, private Page: PageNumber){}
 
  ngOnInit(): void {
    if(this.Mangas){
      this.Mangas.unsubscribe();
    }
    this.Page.PageNumberData$.subscribe(item=>{
      this.page = item;
    })
    // var x= ()=>{
    //   let a:any[]=[];
    //   for(let i=1; i<=this.page; i++){
    //     a.push(i);
    //   }
    //   return a;
    // }
    //code hàm trên của AI
    this.data2 = (() => Array.from({length: this.page}, (_, i) => i + 1))();

    this.Mangas= this.mangaDefault.MangaData$.subscribe((item:any)=>{2
      console.log(item);
      this.mangalist= item;
    })
     this.datafirstload = this.mangalist.slice(0,6);
    //dùng làm infinity scroll bar
    setInterval(() =>this.PreNewUpdate(), 5000);
    this.Topmangabydate(this.mangalist);
  }
  //nút pre trong list new update
  PreNewUpdate(){
    const listItem = document.querySelector('.list-item');
    const lastItem = listItem?.lastElementChild;
  
    if (lastItem) {
      listItem?.prepend(lastItem);
    }
  }
  //nút next trong list new update
  NextNewUpdate(){
    const listItem = document.querySelector('.list-item');
    const firstItem = listItem?.firstElementChild;
    if (firstItem) {
      listItem?.appendChild(firstItem);
    }
  }
  //chuyển string sang number và return
  convertToNumber(value: any){
    const number = Number(value);
    return number;
  }
  ClassChapter(chapter: any, list: any){
    let resultClass = 'list-group-item d-sm-block';
  
    if(list.length === 1){
      return resultClass;
    }
    for(let index=0 ; index< list.length; index++){
      const element = list[index];
      if(chapter === element && index !== 0 && (index+1) !== list.length){
        resultClass ='list-group-item d-md-block d-none';
      }
      else if(chapter === element && (index+1) === list.length)
      {
        resultClass='list-group-item d-lg-block d-none';
      }
    }
    return resultClass;
  }
  //sắp xếp giảm dần của listitem theo view 
  Topmangabydate(mangas: any){
    const topdate = this.mangalist.sort((a,b)=> b.view - a.view).map(
      item=>{
        //toán tử mở rộng của js hay typescript dùng để tạo bảng sau hay nối thêm phần tử vào 
        //ví dụ const obj1 = { a: 1, b: 2 };
        //      const obj2 = { ...obj1, c: 3 };
        //      console.log(obj2);
        //      { a: 1, b: 2, c: 3 }
        // ở đây ta dùng toán tử ... để return về item với thuộc tính view đã thay đổi dịnh dạng từ 111000 thành 111.000
        return{
          ...item,
          view: item.view.toLocaleString()
        };
      }
    );
    return topdate;
  }
 
  // getUrl(item: any){
  //   const id= item.id;
  //   const name= item.title.replace(/ /g, '-');
  //     return `/Manga/${id}/${name}`;
  // }
  getUrl(item: any){
    const id= item.mangaId;
    const name= item.mangaName.replace(/ /g, '-');
      return `/Manga/${id}/${name}`;
  }
  readchapter(chapter: any, manga: any){
    let manganame= manga.mangaName.replace(/ /g, '-');
    let chaptername= chapter.chapterName.replace(/ /g, '-');
    const url= `/Manga/${manga.mangaId}/${manganame}/${chapter.chapterId}/${chaptername}`;
    return url;
  }

  ngOnDestroy(): void {
    this.Mangas.unsubscribe();
  }
}
