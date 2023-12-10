import { Component, OnInit } from '@angular/core';
import { Topmangadefault } from 'src/app/Service/manga.service';
import { UserService } from 'src/app/Service/user.service';
import { isLogin } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
export class SlidebarComponent implements OnInit{


  date: any[]=[];
  month: any[]=[];
  year: any[]=[];
  hasLogin: any;
  Id: any;
  mangafollowing: any[]= [];
  constructor(private Topmanga: Topmangadefault, private isLogin: isLogin, private userService: UserService){}
  ngOnInit(): void {
    this.Topmanga.TopmangaData$.subscribe((item: any)=>{
      this.date = item.filter((x: any)=> x.typetop === '1') ?? null;
      this.month = item.filter((x: any)=> x.typetop ==='2') ?? null;
      this.year = item.filter((x: any)=> x.typetop ==='3') ?? null;
    })
    this.isLogin.isLogin$.subscribe((result: any)=>{
      this.hasLogin = result.status;
      const user= JSON.parse(result.user);
      this.Id = user.id;
    })
    this.userService.danhSachTruyenTheoDoi(this.Id).subscribe((item: any)=>{
      this.mangafollowing = item;
    })
  }
  Format(view :number): string{
    return view.toLocaleString();
  }
  getUrl(item: any){
    const id= item.mangaId;
    const name= item.mangaName.replace(/ /g, '-');
      return `/Manga/${id}/${name}`;
  }
}
