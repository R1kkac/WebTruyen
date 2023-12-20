import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { FaStackItemSizeDirective } from '@fortawesome/angular-fontawesome';
import { Subscription } from 'rxjs';
import { MangaService } from 'src/app/Service/manga.service';
import { SearchbyCategories } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-resultsearch',
  templateUrl: './resultsearch.component.html',
  styleUrls: ['./resultsearch.component.scss']
})
export class ResultsearchComponent implements OnInit{

  list:any[]=[];
  private sub!: Subscription;
  flag=false;
  constructor(private searchManga: SearchbyCategories, private mangaService: MangaService, private route: ActivatedRoute,
    private router: Router){
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(item=>{
      const type= Number(item.get('type')) || 1;
      if(type ==1){
        this.list=[];
        if(this.sub){
          this.sub.unsubscribe();;
        }
        this.sub= this.searchManga.searchData$.subscribe(item=>{
          this.mangaService.GetMangaByListCategories(item).subscribe((items: any)=>{

              this.list = items;
              if(this.list.length >0){
                this.flag = true;
              }
              else{
                this.flag = false;
              }
            })
        });
      }else{
        this.list=[];
        if(this.sub){
          this.sub.unsubscribe();;
        }
        this.sub= this.searchManga.searchData$.subscribe(item=>{
          this.mangaService.GetMangaByListCategoriesWithAllCategories(item).subscribe((items: any)=>{
              const listmanga= items.$values;
              this.list = listmanga;
              if(this.list.length >0){
                this.flag = true;
              }
              else{
                this.flag = false;
              }
            })
        });
      }
    })
  }
  infomanga(input: any){
    let manganame='';
    if(input.mangaName === undefined){
      manganame =input.MangaName.replace(/ /g, '-');
    }
    else{
      manganame = input.mangaName.replace(/ /g, '-');
    }
    this.router.navigate([`Manga/${input.mangaId || input.MangaId}/${manganame}`]);
  }
  readchapter(chapter: any, manga: any){
    let manganame='';
    if(manga.mangaName === undefined){
      manganame =manga.MangaName.replace(/ /g, '-');
    }
    else{
      manganame = manga.mangaName.replace(/ /g, '-');
    }
    const url= `/Manga/${manga.mangaId || manga.MangaId}/${manganame}/${chapter.chapterId || chapter.ChapterId}/${chapter.chapterIndex || chapter.ChapterIndex}`;
    return url;
  }
}
