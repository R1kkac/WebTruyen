import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component,ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { MangaDefault, MangaService } from 'src/app/Service/manga.service';
import { WebsiteServiceService } from 'src/app/Service/website-service.service';

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
  manga:any;
  private chapterlistSubject = new BehaviorSubject<any[]>([]);
  chapterlist$ = this.chapterlistSubject.asObservable();
  isLastChapter= false;
  rate: number[]=[];
  constructor(private route:ActivatedRoute, private webService: WebsiteServiceService, private mangaService: MangaService,
    private mangaDefault: MangaDefault){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((item: ParamMap)=>{
      const Id= item.get('id');
      this.mangaDefault.MangaData$.subscribe(item=>{
        const index= item.findIndex(x=> x.mangaId == Id);
        if(index != -1){
           this.manga= item.find(x=> x.mangaId == Id);
           this.mangaService.GetListChapterByManga(this.manga.mangaId).subscribe(item=>{
            this.manga.listChaper = item;
           });
        }else
        {
          this.mangaService.GetMangaInfo(Id!).subscribe({
            next: (item:any)=>{
              this.manga=item;
            },
            complete: ()=>{
              setTimeout(() => {
                if(this.manga.listChaper.length <=5){
                  this.chapterlistSubject.next(this.getListSort(0,this.manga.listChaper.length, this.manga.listChaper));
                }
                else{
                  this.chapterlistSubject.next(this.getListSort(0,5, this.manga.listChaper));
                }
              }, 0);
            }
          })
        }
      })
    });
    if(this.manga.listChaper.length <=5){
      this.chapterlistSubject.next(this.getListSort(0,this.manga.listChaper.length, this.manga.listChaper));
    }
    else{
      this.chapterlistSubject.next(this.getListSort(0,5, this.manga.listChaper));
    }
  }
  formatview(input: any){
    return this.webService.formatView(input);
  }
  seemoredetail(){
    const element= this.detail.nativeElement;
    const seemore= document.getElementsByClassName('more-manga-detail')[0] as HTMLElement;
    if(this.isClamped === false){
      element.style.webkitLineClamp ='unset'
      this.isClamped = true;
      seemore.textContent = 'Ẩn bớt';
    }
    else{
      element.style.webkitLineClamp ='3'
      this.isClamped= false;
      seemore.textContent = 'Xem thêm';
    }
  }
  morechapter(){
    let element= this.listchapter.nativeElement;
    if(this.isLastChapter === false && this.manga.listChaper.length >5)
    {
      element.style.maxHeight ='300px';
      element.style.overflowY ='auto';
      const data = this.manga.listChaper.slice().sort((a: any, b: any) => {
        const xa = this.extractChapterNumber(a.chapterName);
        const xb = this.extractChapterNumber(b.chapterName);
        
        // Sắp xếp theo số chương
        return xb - xa;
      });
      this.chapterlistSubject.next(data);
      // const result = this.getListSort(5 , this.datachapter.length, this.manga.listChaper) ;
      // this.chapterlistSubject.next([...this.chapterlistSubject.value, ...result]);
      this.isLastChapter = true;
    }
  }
  extractChapterNumber = (chapterName: string): number => {
    // Sử dụng regular expression để trích xuất số từ tên chương
    const match = chapterName.match(/(\d+)/);
  
    // Nếu có một số được tìm thấy, trả về nó; ngược lại, trả về 0
    return match ? parseInt(match[0], 10) : 0;
  };
  hidechapter()
  {
    let element= this.listchapter.nativeElement;
    if(this.isLastChapter=== true){
      element.style.maxHeight ='';
      element.style.overflowY ='unset';
      const data = this.manga.listChaper.slice().sort((a: any, b: any) => {
        const xa = this.extractChapterNumber(a.chapterName);
        const xb = this.extractChapterNumber(b.chapterName);
        
        // Sắp xếp theo số chương
        return xb - xa;
      }).slice(0,3);
      this.chapterlistSubject.next(data);
      // if(this.manga.listChaper.length <=5){
      //   this.chapterlistSubject.next(this.getListSort(0,this.manga.listChaper.length, this.manga.listChaper));
      // }else{
      //   this.chapterlistSubject.next(this.getListSort(0,5, this.manga.listChaper));
      // }
      this.isLastChapter = false;     
    }
  }
  getListSort(start: number, end: number, data: any){
    return data.slice().sort((a: any,b: any)=> b.chapterName - a.chapterName).slice(start,end);
  }
  readchapter(chapter: any){
    let manganame= this.manga.mangaName.replace(/ /g, '-');
    let chaptername= chapter.chapterName.replace(/ /g, '-');
    const url= `/Manga/${this.manga.mangaId}/${manganame}/${chapter.chapterId}/${chaptername}`;
    return url;
  }
  ngOnDestroy(): void {
    this.chapterlistSubject.unsubscribe();
  }
  rating(){
    this.webService.showAndHideDisplayElement('.rate'); 
  }
  check(input: any, index: number){
    const imgs= document.querySelectorAll('.star-icon') as NodeListOf<HTMLImageElement>;
    const imgsArray = Array.from(imgs);

    const img = input.target as HTMLImageElement;
    //lấy vị trí của element
    const boundingRect = img.getBoundingClientRect();
    //lấy độ dài cuối cùng của thẻ trên trang trừ cho vị trí trỏ vào thẻ {vị trí cuối là nởi kết thúc thẻ right:0 } 
    const mouseX = boundingRect.right- input.clientX;
    //chia với để xác định 2 nửa theo chiều ngang của thẻ
    const halfWidth = boundingRect.width / 2;

   
    const x= Math.abs(input.clientX - boundingRect.left);
    // nếu vị trí trỏ chuột nhỏ hơn điểm đầu của ngôi sao trên màn hình 
    if(input.clientX - boundingRect.left <1){
      for(let i=imgs.length -1; i> index; i--){
          imgsArray[i].src ='../assets/star-empty-svgrepo-com.svg';
      }
      for(let j=0 ; j<= index; j++){
        imgsArray[j].src ='../assets/star-svgrepo-com.svg';
      }
    }
    // nếu nhỏ hơn một nửa độ dài ngôi sao
    if (mouseX >= halfWidth) {
      // Trỏ chuột ở nửa đầu
      //console.log('Nửa đầu');
      for(let i=imgs.length -1; i> index; i--){
        imgsArray[i].src ='../assets/star-empty-svgrepo-com.svg';
      }
      for(let j=0 ; j< index; j++){
        imgsArray[j].src ='../assets/star-svgrepo-com.svg';
      }
      img.src ='../assets/half-star-svgrepo-com.svg';
    } 
    //nếu lớn hơn một nửa
    else if(mouseX < halfWidth){
      // Trỏ chuột ở nửa cuối
      //console.log('Nửa cuối');
      for(let i=imgs.length -1; i> index; i--){
        imgsArray[i].src ='../assets/star-empty-svgrepo-com.svg';
      }
      for(let j=0 ; j<= index; j++){
        imgsArray[j].src ='../assets/star-svgrepo-com.svg';
      }
      img.src ='../assets/star-svgrepo-com.svg';
    }
  }
  //lấy số sao người dùng đánh giá
  review(){
    var count=0;
    const imgs= document.querySelectorAll('.star-icon') as NodeListOf<HTMLImageElement>;
    const stara='star-svgrepo-com.svg';
    const starb='half-star-svgrepo-com.svg';
    imgs.forEach((item: HTMLImageElement)=>{
      const url= item.src.split('/');
      const src = url[url.length - 1];
      if(src == stara){
        count +=1;
      }
      if(src == starb){
        count += 0.5;
      }
    })
    alert('Bạn đã đánh giá bộ truyện này '+ count.toString() +'sao');
    this.webService.showAndHideDisplayElement('.rate'); 
  }
  follow(item: any){
    alert("Đã theo dõi thành công");
  }
}