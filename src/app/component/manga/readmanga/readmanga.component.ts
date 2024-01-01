import { Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MangaService } from 'src/app/Service/manga.service';
import { UserService } from 'src/app/Service/user.service';
import { WebsiteServiceService } from 'src/app/Service/website-service.service';
import { PopupMessageService, Processbar } from 'src/app/Service/repositores/injectable';


@Component({
  selector: 'app-readmanga',
  templateUrl: './readmanga.component.html',
  styleUrls: ['./readmanga.component.scss']
})
export class ReadmangaComponent implements OnInit,OnDestroy{
  
  @ViewChildren('listmanga') listmanga!: QueryList<ElementRef>;
  @ViewChildren('item') listitem!: QueryList<ElementRef>;
  @ViewChild('listchapter') chaptermenu!: ElementRef;
  private subscription!: Subscription;
  private subscription2!: Subscription;

  private listdataSubject = new BehaviorSubject<any[]>([]);
  listdata$ = this.listdataSubject.asObservable();
  count=5;
  listurl: any[]=[];
  isShowChapter: boolean = false;
  curindex=0;
  listChapter: any[] =[];
  info: info = {mangaid: '', manganame: '', chapterId: '', chapterIndex: ''};
  cur_index_history_read: any;
  constructor(private processBar: Processbar, private mangaService: MangaService, private route: ActivatedRoute,private renderer: Renderer2,
    private router: Router, private popUpmessage: PopupMessageService,private el: ElementRef, private websiteService: WebsiteServiceService,
    private userService: UserService,private toastr: ToastrService, private title: Title){
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe((item: ParamMap)=>{
      this.info= {
        mangaid: item.get('id')|| '',
        manganame: item.get('name') || '',
        chapterId: item.get('idchapter')|| '',
        chapterIndex: item.get('chapterIndex')|| '',
      }
      this.title.setTitle(`Đọc truyện ${this.info.manganame}`);
      this.cur_index_history_read= this.websiteService.readIndexReadManga(this.info.mangaid, this.info.chapterId);
      this.getData(this.info.mangaid,this.info.chapterId);
      setTimeout(() => {
        //đếm ngược thời gian người dùng ở trong trang đọc truyện này nếu trên 5s thì sẽ gọi hàm này và tính 1 view
        this.userService.ViewManga(this.info.mangaid).subscribe();
      }, 10000);
     });

    const aaad=this.route.url;
    
  }
  getData(mangaid: any, chapperid: any){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    if(this.subscription2){
      this.subscription2.unsubscribe();
    }
    this.processBar.sendData(0,0);
    this.curindex=0;
    this.listdataSubject.next([]);
    this.listurl=[];
    this.subscription= this.mangaService.GetdataChapter(mangaid, chapperid).subscribe({
      next:(item:any)=>{
        this.listurl= item;
        if(this.cur_index_history_read){
          console.log(this.cur_index_history_read.cur_index);
          console.log(this.listurl.length);
          if(this.cur_index_history_read.cur_index+5 < this.listurl.length){
            this.listdataSubject.next(this.listurl.slice(0,this.cur_index_history_read.cur_index + 5 + 1));
            this.count=this.cur_index_history_read.cur_index + 5 + 1;
          }else{
            this.listdataSubject.next(this.listurl.slice(0,this.cur_index_history_read.cur_index + 1));
            this.count=this.cur_index_history_read.cur_index + 1;
          }
        }else{
          this.listdataSubject.next(this.listurl.slice(0,5));
          this.count=5;
        }
      },
      error: (err:any)=>{
        this.listdataSubject.next([]);
        this.toastr.error('Lỗi kết tối tới máy chủ');
      },
      complete: ()=>{
       setTimeout(() => {
        this.listmanga.forEach((item: ElementRef, index: number)=>{
          if(this.cur_index_history_read !== null && this.cur_index_history_read.cur_index== index){
            this.websiteService.scrollToLocation_Smooth(item.nativeElement);
          }
        })
       }, 500);
      }
    });
    this.subscription2 = this.mangaService.GetListChapterByManga(mangaid).subscribe((item: any)=>{
      this.listChapter = item.sort((a: any, b: any)=> a.chapterIndex - b.chapterIndex);
    })
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    this.listitem.forEach((item: ElementRef, index: number)=>{
      const rect = item.nativeElement.getBoundingClientRect();
      const centerY = window.innerHeight / 2;
      //Nếu phần tử ở giữa màn hình thì index= phần tử đó
      if (rect.top <= centerY && rect.bottom >= centerY) {
        //write_index_read_manga
        if(index>0 && index< this.listurl.length){
          this.websiteService.writeIndexReadManga(this.info.mangaid, this.info.chapterId, index, this.listurl.length);
          if(index+1 == this.listurl.length){
            this.websiteService.removeIndexReadManga(this.info.mangaid, this.info.chapterId);
          }
        }
        //processbar
        this.curindex= (index +1 === this.listurl.length) ? 100 : (index / this.listurl.length) *100 +10;
        console.error(this.count)
        this.processBar.sendData(index,this.listurl.length);
        // Phần tử ở giữa màn hình
        if((index+1) == this.count && (index + 1)< this.listurl.length){
          const curdata= this.listdataSubject.getValue();
          if(this.listurl.length - this.count >=5){
            console.log(this.listurl.length - this.count)
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
    return this.listurl.slice(index, index+ data);
  }
  gohead(){
    setTimeout(() => {
      document.body.scrollIntoView({ behavior: 'instant', block: 'start'});
    }, 0);
  }
  prechapter(){
    const prechap: any= this.listChapter.find(x=> x.chapterIndex === Number(this.info.chapterIndex)-1) ?? 0;
    if(prechap === 0){
      this.popUpmessage.showMessage('Bạn đang ở chương đầu của bộ truyện');
    }
    else{
      this.websiteService.scrolltoTop();
      this.router.navigate([`Manga/${this.info.mangaid}/${this.info.manganame}/${prechap.chapterId}/${prechap.chapterIndex}`])
    }
  }
  nextchapter(){
    const prechap: any= this.listChapter.find(x=> x.chapterIndex === Number(this.info.chapterIndex)+1) ?? 999999;
    if(prechap === 999999){
      this.popUpmessage.showMessage('Bạn đang ở chương cuối của bộ truyện');
    }
    else{
      this.websiteService.scrolltoTop();
      this.router.navigate([`Manga/${this.info.mangaid}/${this.info.manganame}/${prechap.chapterId}/${prechap.chapterIndex}`])
    } 
  }
  readchapter(input : any){
    this.websiteService.scrolltoTop();
    this.router.navigate([`Manga/${this.info.mangaid}/${this.info.manganame}/${input.chapterId}/${input.chapterIndex}`]);
  }
  mangadetails(){
    this.router.navigate([`Manga/${this.info.mangaid}/${this.info.manganame}`]);
  }
  showchapter(){
    const element= this.chaptermenu.nativeElement;
    this.isShowChapter = !this.isShowChapter;
    if(this.isShowChapter === true){
      this.renderer.setStyle(element , 'display', 'block');
    }
    else{
      this.renderer.setStyle(element , 'display', 'none');
    }
  }
  ngOnDestroy(): void { 
    this.listdataSubject.unsubscribe();
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
  // như tên dùng để làm lazyloading cho image
  removewhenimageloaded(index: number){
    //thẻ loading
    const elementToRemove = document.getElementById(`${index}`);
    // thẻ content
    const curelement = document.getElementById(`${index}-image`);
    if (elementToRemove) {
      this.renderer.removeChild(this.el.nativeElement, elementToRemove);
      this.renderer.setStyle(curelement , 'width', 'auto');
      this.renderer.setStyle(curelement , 'height', 'auto');
      this.renderer.setStyle(curelement , 'visibility', 'visible');
    }
  }
}
export interface info{
  mangaid: string;
  manganame: string;
  chapterId: string;
  chapterIndex: string;
}

