import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MangaDefault, MangaService, PageNumber } from 'src/app/Service/manga.service';

@Component({
  selector: 'app-mangapage',
  templateUrl: './mangapage.component.html',
  styleUrls: ['./mangapage.component.scss']
})
export class MangapageComponent implements OnInit{

  private Mangas!: Subscription;
  mangalist:any[]=[];
  constructor(private mangaDefault: MangaDefault, private Page: PageNumber, private mangaService: MangaService,
    private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((item: ParamMap)=>{
      const a= item.get('page');
      if(a!= null || a!= undefined){
        this.mangaService.GetmangaByPage(a).subscribe((item: any)=>{
          this.mangalist = item;
          setTimeout(() => {
            document.body.scrollIntoView({ behavior: 'instant', block: 'start'});
          }, 0);
        })
      }else{
        if(this.Mangas){
          this.Mangas.unsubscribe();
        }
        this.Mangas= this.mangaDefault.MangaData$.subscribe((item:any)=>{
          this.mangalist= item;
          setTimeout(() => {
            document.body.scrollIntoView({ behavior: 'instant', block: 'start'});
          }, 0);

        })
      }
    })
  }
  ClassChapter(chapter: any, list: any){
    let resultClass = 'list-group-item d-sm-block';
  
    if(list.length === 1){
      return resultClass;
    }
    for(let index=0 ; index< list.length; index++){
      const element = list[index];
      if(chapter === element && index !== 0 && (index+1) !== list.length){
        resultClass ='list-group-item d-md-block d-none';
      }
      else if(chapter === element && (index+1) === list.length)
      {
        resultClass='list-group-item d-lg-block d-none';
      }
    }
    return resultClass;
  }
  getUrl(item: any){
    const id= item.mangaId;
    const name= item.mangaName.replace(/ /g, '-');
      return `/Manga/${id}/${name}`;
  }
  readchapter(chapter: any, manga: any){
    let manganame= manga.mangaName.replace(/ /g, '-');
    const url= `/Manga/${manga.mangaId}/${manganame}/${chapter.chapterId}/${chapter.chapterIndex}`;
    return url;
  }
}
