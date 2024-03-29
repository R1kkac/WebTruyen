import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ResultSearchManga } from 'src/app/Service/repositores/injectable';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  ListSearch: any[]=[];
  constructor(private resultSearchManga: ResultSearchManga, private router: Router, private title: Title){
    this.title.setTitle('Kết quả tìm kiếm');
  }
  ngOnInit(): void {
    this.resultSearchManga.SearchMangaData$.subscribe((result: any)=>{
      console.log(result);
      this.ListSearch = result || [];
    })
  }
  infomanga(input: any){
    const name= input.mangaName.replace(/ /g, '-');
    this.router.navigate([`Manga/${input.mangaId}/${name}`]);
  }
}
