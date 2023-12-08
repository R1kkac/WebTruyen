import { Component, OnInit } from '@angular/core';
import { Topmangadefault } from 'src/app/Service/manga.service';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
export class SlidebarComponent implements OnInit{


  date: any[]=[];
  month: any[]=[];
  year: any[]=[];
  constructor(private Topmanga: Topmangadefault){}
  ngOnInit(): void {
    this.Topmanga.TopmangaData$.subscribe((item: any)=>{
      this.date = item.filter((x: any)=> x.typetop === '1');
      this.month = item.filter((x: any)=> x.typetop ==='2');
      this.year = item.filter((x: any)=> x.typetop ==='3');
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
