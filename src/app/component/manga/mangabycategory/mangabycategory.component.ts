import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
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
  styleUrls: ['./mangabycategory.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: 0
      })),
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      transition('collapsed => expanded', animate('300ms ease-in')),
      transition('expanded => collapsed', animate('300ms ease-out'))
    ]),
    trigger('stagger', [
      state('void', style({ transform: 'translateY(-100%)', opacity: 0 })),
      transition(':enter', [
        animate('300ms ease-out', keyframes([
          style({ transform: 'translateY(0)', opacity: 0, offset: 0 }),
          style({ transform: 'translateY(-100%)', opacity: 1, offset: 1 })
        ]))
      ]),
      transition(':leave', [
        animate('300ms ease-in', keyframes([
          style({ transform: 'translateY(-100%)', opacity: 1, offset: 0 }),
          style({ transform: 'translateY(0)', opacity: 0, offset: 1 })
        ]))
      ])
    ])
  ]
})
export class MangabycategoryComponent implements OnInit{
  menu:  boolean = true;
  menuState: string = 'collapsed';
  menuIconClass: string = 'fa-caret-down';


  listManga: any[]=[];
  CategorysSource: any[]=[];
  Categorys: any[]=[]
  page: any;
  pageforcategories: any;
  idcategories:any;
  curcategory: any;
  private subcription!: Subscription;
  constructor(private route: ActivatedRoute, private mangaService: MangaService, private categoriesService: DataCategories,
    private websiteService: WebsiteServiceService, private title: Title, private router: Router){}
  ngOnInit(): void {
    this.categoriesService.CategoriesData$.subscribe({
      next: (item: any)=>{
        this.CategorysSource= item;
        this.Categorys = this.CategorysSource.slice(0, 15);
        this.pageforcategories = this.websiteService.returnPage(this.CategorysSource.length, 15);
      }
    })
    this.route.paramMap.subscribe((item: ParamMap)=>{
      const id= item.get('idcategory');
      if(this.subcription){
        this.subcription.unsubscribe()
      }
      this.subcription = this.mangaService.GetMangaByCategories(id!,1,8).subscribe(items=>{
        this.page = this.websiteService.returnPage(items.numberManga, 8);
        const ca= this.CategorysSource.find(item=> item.genreId == id);
        this.curcategory= ca;
        this.listManga = items.listmanga;
      })
      this.idcategories= id;
      this.curcategory= this.CategorysSource.find(item=> item.genreId == id);
      this.title.setTitle(`Thể loại ${this.curcategory.genresIdName}`);
      //this.getManga(this.idcategories);
    });
  }
  changeCategories(index : number){
    this.Categorys = [];
    this.pageforcategories = this.websiteService.returnPage(this.CategorysSource.length, 15);
    if(index ===0){
      this.Categorys = this.CategorysSource.slice(0,15);
    }
    else{
      this.Categorys = this.CategorysSource.slice(index * 15, (index*15)+15);
    }
  }
  getManga(id: any){
    this.router.navigate([`The-loai/${id}`]);
    setTimeout(() => {
      this.showandhidemenu();
    }, 500);
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
  getmangapage(page: any){
    this.subcription = this.mangaService.GetMangaByCategories(this.curcategory.genreId,page,8).subscribe(items=>{
      this.page = this.websiteService.returnPage(items.numberManga, 8);
      this.listManga = items.listmanga;
    })
  }
  showandhidemenu(){
    this.menu = !this.menu;
    this.menuState = this.menu ? 'collapsed' : 'expanded';
    this.menuIconClass = this.menu ? 'fa-caret-down' : 'fa-caret-right';
  }
}
