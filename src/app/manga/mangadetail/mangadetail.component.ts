import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component,ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-mangadetail',
  templateUrl: './mangadetail.component.html',
  styleUrls: ['./mangadetail.component.scss']
})
export class MangadetailComponent implements OnInit, OnDestroy{
  isClamped: boolean = false;
  @ViewChild('detail') detail!: ElementRef;
  @ViewChild('listdatachapter') listchapter!: ElementRef;
datachapter=[
  {id:'1', chapter:'1', date: '12/12/2022', status: 'đã xem qua'},
  {id:'2', chapter:'2', date: '13/12/2022', status: 'chưa xem qua'},
  {id:'3', chapter:'22', date: '13/09/2023', status: 'chưa xem qua'},
  {id:'4', chapter:'21', date: '13/09/2023', status: 'chưa xem qua'},
  {id:'5', chapter:'3', date: '16/12/2022', status: 'chưa xem qua'},
  {id:'6', chapter:'4', date: '20/12/2022', status: 'đã xem qua'},
  {id:'7', chapter:'5', date: '23/12/2022', status: 'đã xem qua'},
  {id:'8', chapter:'6', date: '29/12/2022', status: 'chưa xem qua'},
  {id:'9', chapter:'7', date: '31/12/2022', status: 'chưa xem qua'},
  {id:'10', chapter:'8', date: '01/01/2023', status: 'đã xem qua'},
  {id:'11', chapter:'9', date: '13/06/2023', status: 'đã xem qua'},
  {id:'12', chapter:'10', date: '13/09/2023', status: 'đã xem qua'},
  {id:'13', chapter:'11', date: '13/09/2023', status: 'đã xem qua'}
]
manga={
  id: '119067',
  name: 'Hyouka', update: '12:12 18/11/2023', author: 'Hajime', status: 'Đang tiến hành', categories: [
    {id: '1' , name: 'Hành động'},
    {id: '2' , name: 'Hài hước'},
    {id: '3' , name: 'Đời thường'},
    {id: '4' , name: 'Lãng mạng'},
    {id: '5' , name: 'Tình cảm'},
  ],
  view: '1199067',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi non arcu risus quis varius quam quisque id diam. Quis commodo odio aenean sed adipiscing diam donec adipiscing. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Dolor sit amet consectetur adipiscing elit. At imperdiet dui accumsan sit amet nulla facilisi morbi. Sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. Urna neque viverra justo nec ultrices dui sapien eget. Luctus accumsan tortor posuere ac. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Pharetra vel turpis nunc eget lorem dolor sed. Ultrices gravida dictum fusce ut placerat orci nulla. Pulvinar mattis nunc sed blandit. Blandit volutpat maecenas volutpat blandit. Massa massa ultricies mi quis hendrerit. Ornare suspendisse sed nisi lacus sed viverra tellus in. Proin libero nunc consequat interdum. Pulvinar sapien et ligula ullamcorper. Semper eget duis at tellus at urna condimentum mattis.',
  image: '../assets/hyouka.jpg'
}
  private chapterlistSubject = new BehaviorSubject<any[]>([]);
  chapterlist$ = this.chapterlistSubject.asObservable();
  isLastChapter= false;

  constructor(private router:Router){}
  ngOnInit(): void {
    this.chapterlistSubject.next(this.getListSort(0,5));
  }
  seemoredetail(){
    const element= this.detail.nativeElement;
    if(this.isClamped === false){
      element.style.webkitLineClamp ='unset'
      this.isClamped = true;
    }
    else{
      element.style.webkitLineClamp ='3'
      this.isClamped= false;
    }
  }
  morechapter(){
    let element= this.listchapter.nativeElement;
    if(this.isLastChapter === false)
    {
      element.style.maxHeight ='300px';
      element.style.overflowY ='auto';
      const result = this.getListSort(5 , this.datachapter.length) ;
      this.chapterlistSubject.next([...this.chapterlistSubject.value, ...result]);
      this.isLastChapter = true;
    }
  }
  hidechapter()
  {
    let element= this.listchapter.nativeElement;
    if(this.isLastChapter=== true){
      element.style.maxHeight ='';
      element.style.overflowY ='unset';
      this.chapterlistSubject.next(this.getListSort(0,5));
      this.isLastChapter = false;     
    }
  }
  getListSort(start: number, end: number){
    return this.datachapter.slice().sort((a: any,b: any)=> b.chapter - a.chapter).slice(start,end);
  }
  readchapter(chapter: any){
    let manganame= this.manga.name.replace(/ /g, '-');
    let chaptername= this.manga.name.replace(/ /g, '-');
    const url= `/Manga/${this.manga.id}/${manganame}/${chapter.id}/${chaptername}`;
    return url;
  }
  ngOnDestroy(): void {
    this.chapterlistSubject.unsubscribe();
  }
}
