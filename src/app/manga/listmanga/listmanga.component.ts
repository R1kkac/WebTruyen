import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MangaService } from 'src/app/Service/manga.service';
import { WebsiteServiceService } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-listmanga',
  templateUrl: './listmanga.component.html',
  styleUrls: ['./listmanga.component.scss']
})
export class ListmangaComponent implements OnInit{
  Categories=[
    {type:0, viewname:'A-Z', name: 'A-Z'},
    {type:1, viewname:'Z-A', name: 'Z-A'},
    {type:2, viewname:'Tình trạng', name: 'Tinh-trang'},
    {type:3, viewname:'Ngày cập nhật', name: 'Ngay-cap-nhat'},
    {type:4, viewname:'Số chương', name: 'So-chuong'},
    {type:5, viewname:'Lượt xem', name: 'Luot-xem'},
    {type:6, viewname:'Đánh giá', name: 'Danh-gia'},
  ]
  pagination:any[]=[];
  result: any[]=[];
  number=0;
  constructor(private webService: WebsiteServiceService, private route: ActivatedRoute, private title: Title, private mangaService: MangaService,
    private router:Router){
    this.title.setTitle('Danh sách truyện - Yahallo')
  }
  ngOnInit(): void {
    this.mangaService.GetNumberManga().subscribe(number=>{
      this.number= number;
      this.pagination = Array.from({ length:  Math.ceil(number / 10) }, (_, index) => index + 1);
    }) 
    this.route.paramMap.subscribe(param=>{
      const name= param.get('type') || 'A-Z';
      const Id= this.Categories.find(x=> x.name == name)?.type;
      this.mangaService.GetAllMangaByTYpe(Id,10, 1).subscribe((result: any)=>{
        this.result= result;
      })
    });
   
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
  getmanga(input: any){
    this.router.navigate([`Manga/${input}`])
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
