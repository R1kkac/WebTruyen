import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MangaService } from 'src/app/Service/manga.service';
import { WebsiteServiceService } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-resulttoppmanga',
  templateUrl: './resulttoppmanga.component.html',
  styleUrls: ['./resulttoppmanga.component.scss']
})
export class ResulttoppmangaComponent implements OnInit{
  Categories=[
    {id: '0', name:'All'},
    {id: '1', name:'Oneshot'},
    {id: '2', name:'Series'},
    {id: '3', name:'Doujinshi'},
    {id: '4', name:'Manhwa'},
    {id: '5', name:'Manhua'},
  ]
  result: any[]=[];
  preId: any;
  typename:any
  flag=false;
  page: any;
  constructor(private route: ActivatedRoute, private mangaService: MangaService, private websiteService: WebsiteServiceService,
    private router: Router, private title: Title){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap)=>{
      const Id=param.get('id') || '0';
      this.preId= Id;
      const category= this.Categories.find(x=> x.id == Id)?.name;
      this.title.setTitle(`Xếp hạng truyện - ${category}`);
      this.result=[];
      this.mangaService.GetmangabyType(Id,1,10).subscribe((item:any)=>{
        console.log(item)
        this.result = item.listmanga;
        this.page= this.websiteService.returnPage(item.numberManga, 10) || 1;
      })
    })
  }
  changedisplay(item: any){
    const element= document.getElementById(item.mangaId) as HTMLElement;
    if(this.flag ===false){
      element.style.display = 'block';
      this.flag = true;
    }else{
      element.style.display = 'none';
      this.flag = false;
    }
  }
  mangainfo(mangaid: any, manganame: any){{
    const name= manganame.replace(/ /g, '-');
    this.router.navigate([`Manga/${mangaid}/${name}`]);
  }}
  formatview(input: any){
    return this.websiteService.formatView(input);
  }
  nextpage(number: number){
    this.result=[];
    this.mangaService.GetmangabyType(this.preId,number,10).subscribe((item:any)=>{
      console.log(item)

      this.result = item.listmanga;
      this.page= this.websiteService.returnPage(item.numberManga, 10) || 1;
    })
  }
}
