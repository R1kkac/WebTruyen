import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component,ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { MangaService } from 'src/app/Service/manga.service';
import { UserService } from 'src/app/Service/user.service';
import { WebsiteServiceService } from 'src/app/Service/website-service.service';
import { PopupMessageService, RoomChat, isLogin } from 'src/app/Service/repositores/injectable';
import { WebsocketService } from 'src/app/Service/websocket.service';
import { RoomCreate } from 'src/app/Service/repositores/interface';


@Component({
  selector: 'app-mangadetail',
  templateUrl: './mangadetail.component.html',
  styleUrls: ['./mangadetail.component.scss']
})
export class MangadetailComponent implements OnInit, OnDestroy{
  isClamped: boolean = false;
  @ViewChild('detail') detail!: ElementRef;
  @ViewChild('listdatachapter') listchapter!: ElementRef;
  manga:any;
  private chapterlistSubject = new BehaviorSubject<any[]>([]);
  chapterlist$ = this.chapterlistSubject.asObservable();
  isLastChapter= false;
  rate: number[]=[];
  listComment: any[]=[];
  hasLogin= false;
  User: any;
  resetComment= false;
  pageComment: any;
  isChatRoom=false;
  constructor(private route:ActivatedRoute, private webService: WebsiteServiceService, private mangaService: MangaService,
    private userService: UserService, private toastr: ToastrService, private isLogin: isLogin,private roomChat: RoomChat,
    private popupService: PopupMessageService, private title: Title, private webSocket: WebsocketService, private router: Router){}
  ngOnInit(): void {
    this.isLogin.isLogin$.subscribe((result: any)=>{
      this.hasLogin= result.status;
      if(this.hasLogin === true){
        this.User = JSON.parse(result.user);
      }
    })
    this.route.paramMap.subscribe((item: ParamMap)=>{
      const Id= item.get('id');
      this.getlistComment(Id!,5,1);
      this.userService.numberComment(Id).subscribe(item=>{
        this.pageComment= (() => Array.from({length: Math.ceil(item/5)}, (_, i) => i + 1))();
      })
      this.mangaService.GetMangaInfo(Id!).subscribe({
        next: (item:any)=>{
          //console.log(item);
          this.manga=item;
          this.title.setTitle(`${this.manga.mangaName}`);
        },
        complete: ()=>{
          this.webSocket.listRoomChatActive();
          this.roomChat.roomchatData$.subscribe((result: any)=>{
            //console.log(result);
            const rooms= result['Rooms'];
            if(rooms){
              const room= rooms.find((x:any)=> x.mangaId == this.manga.mangaId);
              if(room){
                //console.log(room);
  
                this.isChatRoom = true;
              }else{
                this.isChatRoom= false;
              }    
            }
          })
          setTimeout(() => {
            if(this.manga.listChaper.length <=5){
              this.chapterlistSubject.next(this.getListSort(0,this.manga.listChaper.length, this.manga.listChaper));
            }
            else{
              this.chapterlistSubject.next(this.getListSort(0,5, this.manga.listChaper));
            }
          }, 0);
          setTimeout(() => {
            document.body.scrollIntoView({ behavior: 'instant', block: 'start'});
          }, 0);
          this.webService.addHistory(this.manga);
        }
      })
    });
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
        // const xa = this.extractChapterNumber(a.chapterName);
        // const xb = this.extractChapterNumber(b.chapterName);
        
        // Sắp xếp theo số chương
        // return xb - xa;
        return b.chapterIndex - a.chapterIndex;

      });
      this.chapterlistSubject.next(data);
      // const result = this.getListSort(5 , this.datachapter.length, this.manga.listChaper) ;
      // this.chapterlistSubject.next([...this.chapterlistSubject.value, ...result]);
      this.isLastChapter = true;
    }
  }
  hidechapter()
  {
    let element= this.listchapter.nativeElement;
    if(this.isLastChapter=== true){
      element.style.maxHeight ='';
      element.style.overflowY ='unset';
      const data = this.manga.listChaper.slice().sort((a: any, b: any) => {
        
        // Sắp xếp theo số chương
        return b.chapterIndex - a.chapterIndex;
      }).slice(0,3);
      this.chapterlistSubject.next(data);
      this.isLastChapter = false;     
    }
  }
  getListSort(start: number, end: number, data: any){
    // return data.slice().sort((a: any,b: any)=> b.chapterName - a.chapterName).slice(start,end);
    return data.slice().sort((a: any,b: any)=> b.chapterIndex - a.chapterIndex).slice(start,end);
  }
  readchapter(chapter: any){
    let manganame= this.manga.mangaName.replace(/ /g, '-');
    const url= `/Manga/${this.manga.mangaId}/${manganame}/${chapter.chapterId}/${chapter.chapterIndex}`;
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
    });
    if(this.hasLogin == true){
      this.userService.danhGiaTruyen(this.manga.mangaId, count.toString()).subscribe({
        next: (result: any)=>{
          if(result === true){
            this.toastr.success('Đã đánh giá thành công');
            setTimeout(() => {
              this.webService.showAndHideDisplayElement('.rate'); 
            }, 1000);
          }
          else{
            this.toastr.error('Đánh giá tất bại');
          }
        },
        error: (err: any)=>{
          this.toastr.error('đã xảy ra lỗi')
        }
      })
    }else{
      this.popupService.showMessage('Vui lòng đăng nhập để sử dụng tính năng này');
    }
    // alert('Bạn đã đánh giá bộ truyện này '+ count.toString() +'sao');
    // this.webService.showAndHideDisplayElement('.rate'); 
  }
  follow(item: any){
    if(this.hasLogin === true){
      this.userService.taoTheoDoiTruyen(this.User.id, item.mangaId).subscribe({
        next: (result: any)=>{
          if(result.status =='Success'){
            this.toastr.success(`Đã theo dõi truyện`);
          }
        },
        error: (err: any)=>{
          if(err.status === 403){
            this.toastr.error(`Đã theo dõi truyện này rồi`);
          }
          if(err.status === 0){
            this.toastr.warning(`Đã xảy ra lỗi`);
          }
        }
      });
    }else{
      this.popupService.showMessage('Vui lòng đăng nhập để sử dụng chức năng này');
    }
  }
  getlistComment(MangaId: string, pagesize: number, pagenumber: number){
    this.listComment=[];
    this.mangaService.GetlistCommentManga(MangaId, pagesize, pagenumber).subscribe((result: any)=>{
      this.listComment= result;
    })
  }
  commentmanga(mangaid: any, message: any){
    this.userService.binhLuanChuongTruyen(this.User.id,mangaid, 'isnull',message).subscribe({
      error: (err:any)=>{
        //console.log(err);
      },
      complete: ()=>{
        this.getlistComment(this.manga.mangaId,5,1);
      }
    })
  }
  resetcommentf(input: any){
   this.resetComment= input;
   setTimeout(() => {
    this.resetComment = false;
   }, 100);
  }
  formatdatetime(input: any){
    return this.webService.formatdatetime(input);
  }
  avatar(input: any){
    return this.webService.avatar(input);
  }
  creatRoomChat(roomid: any, roomname:any, image:any){
    const room: RoomCreate={
      MangaId: roomid,
      RoomName: roomname,
      image: image
    }
    this.webSocket.createChatRoom(room);
  }
  ChatRoom(){
    this.router.navigate([`c`]);
  }
}