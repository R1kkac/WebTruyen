import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { DataCategories, MangaService } from 'src/app/Service/manga.service';
import { WebsiteServiceService } from 'src/app/Service/website-service.service';
export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-mangabycategory',
  templateUrl: './mangabycategory.component.html',
  styleUrls: ['./mangabycategory.component.scss']
})
export class MangabycategoryComponent implements OnInit{

  listManga: any[]=[];
  CategorysSource: any[]=[];
  Categorys: any[]=[]
  page=0;
  idcategories:any;
  curcategory: any;
  private subcription!: Subscription;
  constructor(private route: ActivatedRoute, private mangaService: MangaService, private categoriesService: DataCategories,
    private websiteService: WebsiteServiceService, private title: Title, private router: Router){}
  ngOnInit(): void {
    this.categoriesService.CategoriesData$.subscribe(item=>{
      this.CategorysSource= item;
    })
    this.Categorys = this.CategorysSource.slice(0, 15);
    this.page = Math.ceil(this.CategorysSource.length / 15);
    this.route.paramMap.subscribe((item: ParamMap)=>{
      const id= item.get('idcategory');
      if(this.subcription){
        this.subcription.unsubscribe()
      }
      this.subcription = this.mangaService.GetMangaByCategories(id!).subscribe(item=>{
        const ca= this.CategorysSource.find(item=> item.genreId == id);
        this.curcategory= ca;
        this.listManga = item;
      })
      this.idcategories= id;
      this.curcategory= this.CategorysSource.find(item=> item.genreId == id);
      this.title.setTitle(`Thể loại ${this.curcategory.genresIdName}`);
      //this.getManga(this.idcategories);
    });
  }
  changeCategories(index : number){
    this.Categorys = [];
    const page = Math.ceil(this.CategorysSource.length / 15);
    if(index ===0){
      this.Categorys = this.CategorysSource.slice(0,15);
    }
    else{
      this.Categorys = this.CategorysSource.slice(index * 15, (index*15)+15);
    }
  }
  getManga(id: any){
    this.router.navigate([`The-loai/${id}`]);
  }
  readchapter(chapter: any, manga: any){
    let manganame= manga.mangaName.replace(/ /g, '-');
    let chaptername= chapter.chapterName.replace(/ /g, '-');
    const url= `/Manga/${manga.mangaId}/${manganame}/${chapter.chapterId}/${chaptername}`;
    return url;
  }
  getUrl(item: any){
    const id= item.mangaId;
    const name= item.mangaName.replace(/ /g, '-');
      return `/Manga/${id}/${name}`;
  }
  formatdate(date: any){
    return this.websiteService.formatdatetime(date);
  }
}
