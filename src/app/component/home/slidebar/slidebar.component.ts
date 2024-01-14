import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';
import { WebsiteServiceService} from 'src/app/Service/website-service.service';
import { Topmangadefault, isLogin} from 'src/app/Service/repositores/injectable';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
export class SlidebarComponent implements OnInit{


  date: any[]=[];
  month: any[]=[];
  year: any[]=[];
  readhistory: any[]=[];
  hasLogin: any;
  Id: any;
  mangafollowing: any[]= [];
  constructor(private Topmanga: Topmangadefault, private isLogin: isLogin, private userService: UserService, private websiteService: WebsiteServiceService){}
  ngOnInit(): void {
    const data= this.websiteService.getHistory();
    if(data !== null){
      this.readhistory= data.slice(0,10);
    }
    this.Topmanga.TopmangaData$.subscribe((item: any)=>{
      this.date = item.filter((x: any)=> x.typetop === '1') || [];
      this.month = item.filter((x: any)=> x.typetop ==='2') || [];
      this.year = item.filter((x: any)=> x.typetop ==='3') || [];
    })
    this.isLogin.isLogin$.subscribe((result: any)=>{
      if(result.status === true){
        this.hasLogin = result.status;
        const user= JSON.parse(result.user);
        this.Id = user.id;
      }
    })
    this.userService.danhSachTruyenTheoDoi(this.Id).subscribe((item: any)=>{
      this.mangafollowing = item.slice(0,5) ?? item;
    })
  }
  Format(view :number): string{
    return view.toLocaleString();
  }
  urlHistory(id: any, name:any){
    const namea= name.replace(/ /g, '-');
      return `/Manga/${id}/${namea}`;
  }
  getUrl(item: any){
    const id= item.mangaId;
    const name= item.mangaName.replace(/ /g, '-');
      return `/Manga/${id}/${name}`;
  }
}
