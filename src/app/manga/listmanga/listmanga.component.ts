import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MangaService } from 'src/app/Service/manga.service';
import { WebsiteServiceService } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-listmanga',
  templateUrl: './listmanga.component.html',
  styleUrls: ['./listmanga.component.scss']
})
export class ListmangaComponent implements OnInit{
  pagination:any[]=[];
  result: any[]=[];
  number=0;
  constructor(private webService: WebsiteServiceService, private route: ActivatedRoute, private title: Title, private mangaService: MangaService){
    this.title.setTitle('Danh sách truyện - Yahallo')
  }
  ngOnInit(): void {
    this.mangaService.GetAllMangaByTYpe(0,10, 1).subscribe((result: any)=>{
      this.result= result;
    })
    this.route.paramMap.subscribe(param=>{
      const type= param.get('type') || 1;
      console.log(type)
    });
    this.mangaService.GetNumberManga().subscribe(number=>{
      this.number= number;
      this.pagination = Array.from({ length:  Math.ceil(number / 10) }, (_, index) => index + 1);
    })
  }
  hovermanga(input: any){
    const tdElement = input.currentTarget as HTMLElement;
    const trElement = tdElement.closest('.items') as HTMLElement;
    const hover = trElement.querySelector('.manga-hover') as HTMLElement;
    if(getComputedStyle(hover).display === 'none'){
      hover.style.display = 'block'
    }
  }
  unhovermanga(input: any){
    const tdElement = input.currentTarget as HTMLElement;
    const trElement = tdElement.closest('.items') as HTMLElement;
    const hover = trElement.querySelector('.manga-hover') as HTMLElement;
    if(getComputedStyle(hover).display === 'block'){
      hover.style.display = 'none'
    }
  }
  getmanga(input: number){
    this.mangaService.GetAllMangaByTYpe(input,10, 1).subscribe((result: any)=>{
      this.result= result;
    })
  }
  changepage(page: number){
    const pagenumber= Number(page);
    this.mangaService.GetAllMangaByTYpe(0,10, pagenumber).subscribe((result: any)=>{
      this.result= result;
    })
  }
  UrlLink(idManga: any, namemanga: any){
    return this.webService.returnMangaUrl(idManga,namemanga);
  }
}
