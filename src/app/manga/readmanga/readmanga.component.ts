import { Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MangaService } from 'src/app/Service/manga.service';
import { Processbar } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-readmanga',
  templateUrl: './readmanga.component.html',
  styleUrls: ['./readmanga.component.scss']
})
export class ReadmangaComponent implements OnInit,OnDestroy{

  @ViewChildren('item') listitem!: QueryList<ElementRef>;
  private listdataSubject = new BehaviorSubject<any[]>([]);
  listdata$ = this.listdataSubject.asObservable();
  count=5;
  listurl: any[]=[];
  constructor(private processBar: Processbar, private mangaService: MangaService, private route: ActivatedRoute){}
  ngOnInit(): void {
    const aaad=this.route.url;
    console.log(window.location.href.replace(/ /g, '-'));


    console.log(aaad);
    this.route.paramMap.subscribe((item: ParamMap)=>{
      const Mangaid= item.get('id');
      const ChapterId= item.get('idchapter');
      this.mangaService.GetdataChapter(Mangaid, ChapterId).subscribe((item:any)=>{
        this.listurl = item;
        this.listdataSubject.next(item.slice(0,5));
      })
    })
    // this.listdataSubject.next(this.listurl.slice(0,5));
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    this.listitem.forEach((item: ElementRef, index: number)=>{
      const rect = item.nativeElement.getBoundingClientRect();
      const centerY = window.innerHeight / 2;
      //Nếu phần tử ở giữa màn hình thì index= phần tử đó
      if (rect.top <= centerY && rect.bottom >= centerY) {
        //processbar
        this.processBar.sendData(index,this.listurl.length);
        // Phần tử ở giữa màn hình
        if((index+1) === this.count && (index + 1)< this.listurl.length){
          const curdata= this.listdataSubject.getValue();
          if(this.listurl.length - this.count >=5){
            this.count +=5;
            const data= this.updateimage(index + 1, 5);
            const updatedata= [...curdata, ...data];
            this.listdataSubject.next(updatedata);
          }else{
            const ex= this.listurl.length - this.count;
            this.count +=ex;
            const data= this.updateimage(index + 1, ex);
            const updatedata= [...curdata, ...data];
            this.listdataSubject.next(updatedata);
          }
        }
      }
    })
  }
  updateimage(index: any, data: number){
    return this.listurl.slice(index, index+5);
  }
  gohead(){
    setTimeout(() => {
      document.body.scrollIntoView({ behavior: 'instant', block: 'start'});
    }, 0);
  }
  ngOnDestroy(): void { 
    this.listdataSubject.unsubscribe();
  }
}
