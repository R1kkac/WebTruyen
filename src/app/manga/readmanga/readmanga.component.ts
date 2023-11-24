import { Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Processbar } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-readmanga',
  templateUrl: './readmanga.component.html',
  styleUrls: ['./readmanga.component.scss']
})
export class ReadmangaComponent implements OnInit,OnDestroy{

  url='https://p2.ntcdntempv26.com/content/image.jpg?data=8vw/pYOMj3vnR8KraMICghH6gCxYpAUdanXcOXDebXRPXayqc1kPJu4WHaSFmCLh5i66nwK6NXBrKgWAi3qtMfRJc6u3p+kf1HVqNHHoXXo='
  url2='https://p2.ntcdntempv26.com/content/image.jpg?data=lYQzNlIkekgNptSkjz69cCwBeNNEBBGUgUODtPVsLbxVi4Ar5ZJUPfkt7x0vD7zKK5ETo1tz74iW6JmNs66MAw=='
  listurl=[
    {id: '1', url: `${this.url2}`},
    {id: '2', url: `${this.url}`},
    {id: '3', url: `${this.url}`},
    {id: '4', url: `${this.url}`},
    {id: '5', url: `${this.url}`},
    {id: '6', url: `${this.url}`},
    {id: '7', url: `${this.url}`},
    {id: '8', url: `${this.url}`},
    {id: '9', url: `${this.url}`},
    {id: '10', url: `${this.url}`},
    {id: '11', url: `${this.url}`},
    {id: '12', url: `${this.url}`},
    {id: '13', url: `${this.url}`},
    {id: '14', url: `${this.url}`},
    {id: '15', url: `${this.url}`},
    {id: '16', url: `${this.url}`},
    {id: '17', url: `${this.url}`},
    {id: '18', url: `${this.url}`},
    {id: '19', url: `${this.url}`},
    {id: '20', url: `${this.url}`},
    {id: '21', url: `${this.url}`},
    {id: '22', url: `${this.url}`},
    {id: '23', url: `${this.url}`},
    {id: '24', url: `${this.url2}`},
    {id: '25', url: `${this.url2}`},
    {id: '26', url: `${this.url2}`}
  ]
  @ViewChildren('item') listitem!: QueryList<ElementRef>;
  private listdataSubject = new BehaviorSubject<any[]>([]);
  listdata$ = this.listdataSubject.asObservable();
  count=5;
  constructor(private processBar: Processbar){}
  ngOnInit(): void {
    this.listdataSubject.next(this.listurl.slice(0,5));
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
          this.count +=5;
          const curdata= this.listdataSubject.getValue();
          const data= this.updateimage(index + 1);
          const updatedata= [...curdata, ...data];
          this.listdataSubject.next(updatedata);
        }
      }
    })
  }
  updateimage(index: any){
    return this.listurl.slice(index, index+5);
  }
  ngOnDestroy(): void { 
    this.listdataSubject.unsubscribe();
    this.listitem.destroy();
  }
}
