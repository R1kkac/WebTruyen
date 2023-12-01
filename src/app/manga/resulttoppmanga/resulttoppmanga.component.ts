import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MangaService } from 'src/app/Service/manga.service';
import { WebsiteServiceService } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-resulttoppmanga',
  templateUrl: './resulttoppmanga.component.html',
  styleUrls: ['./resulttoppmanga.component.scss']
})
export class ResulttoppmangaComponent implements OnInit{

  Categories=[
    {id: 0, name:'All'},
    {id: 1, name:'Oneshot'},
    {id: 2, name:'Series'},
    {id: 3, name:'Doujinshi'},
    {id: 4, name:'Manhwa'},
    {id: 5, name:'Manhua'},
  ];
  data =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  result: any[]=[];
  preId: any;
  typename:any
  flag=false;
  constructor(private route: ActivatedRoute, private mangaService: MangaService, private websiteService: WebsiteServiceService){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap)=>{
      const name=param.get('nametype') || 'All';
      this.typename = name;
      const id= this.Categories.find(item=> item.name === name)?.id;
      if(this.preId != id){
        this.preId = id;
        this.result=[];
        this.mangaService.GetmangabyType(id).subscribe((item:any)=>{
          this.result = item;
        })
      }
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
  formatview(input: any){
    return this.websiteService.formatView(input);
  }
}
