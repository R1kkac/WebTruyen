import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { WebsiteServiceService } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-infouser-readhistory',
  templateUrl: './infouser-readhistory.component.html',
  styleUrls: ['./infouser-readhistory.component.scss']
})
export class InfouserReadhistoryComponent implements OnInit{

  ListHistoryManga: any[]=[];
  constructor(private websiteService: WebsiteServiceService, private router: Router, private title: Title){
    this.title.setTitle(`Lịch sử đọc truyện`);
  }
  ngOnInit(): void {
    const data= this.websiteService.getHistory();
    if(data !== null){
      this.ListHistoryManga= data;
    }
  }
  infomanga(item: any){
    const name= item.name.replace(/ /g, '-');
    this.router.navigate([`Manga/${item.id}/${name}`]);
  }

}
