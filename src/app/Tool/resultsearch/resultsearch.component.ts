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
  constructor(private searchManga: SearchbyCategories, private mangaService: MangaService){
  }
  ngOnInit(): void {
    if(this.sub){
      this.sub.unsubscribe();;
    }
    this.sub= this.searchManga.searchData$.subscribe(item=>{
      this.mangaService.GetMangaByListCategories(item).subscribe((items: any)=>{
          this.list = items;
          if(this.list.length >0){
            this.flag = true;
          }
        })
    });
   
  }
  readchapter(chapter: any, manga: any){
    let manganame= manga.mangaName.replace(/ /g, '-');
    const url= `/Manga/${manga.mangaId}/${manganame}/${chapter.chapterId}/${chapter.chapterIndex}`;
    return url;
  }
}
