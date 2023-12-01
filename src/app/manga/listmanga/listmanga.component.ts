import { Component } from '@angular/core';
import { WebsiteServiceService } from 'src/app/Service/website-service.service';

@Component({
  selector: 'app-listmanga',
  templateUrl: './listmanga.component.html',
  styleUrls: ['./listmanga.component.scss']
})
export class ListmangaComponent {
  data =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  listmanga=[
    {typemanga:'1', id:1, rank: '1' , image: '../assets/hyouka.jpg', name: 'Hyouka', type: 'Series', date: 'Oct 2012 - Apr 2014', view: '119.067', status:'Đã hoàn thành', rating: '9.08',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ,info: {
        categories: [{name: 'Hành động'}, {name: 'Trinh thám'}, {name:'Phiêu lưu'}],
        author: 'Hajime',
        artist: 'Sakura',
        chapter: 52,
        type: 'Series',
        follow: '300.122'
      },
    },
    {typemanga:'2', id:2, rank: '2' , image: '../assets/onepunchman.jpg', name: 'One Punch Man', type: 'Series', date: 'Oct 2015 - now', view: '118.077', status:'Đang tiến hành', rating: '8.08',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ,info: {
        categories: [{name: 'Hành động'}, {name: 'Trinh thám'}, {name:'Phiêu lưu'}],
        author: 'Nastume',
        artist: 'Genji',
        chapter: 111,
        type: 'Series',
        follow: '23.045'
      },
    },
    {typemanga:'3', id:3, rank: '3' , image: '../assets/onepiece.jpg', name: 'One Piece', type: 'Series', date: 'Oct 2005 - now', view: '110.267', status:'Đang tiến hàng', rating: '8.93',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ,info: {
        categories: [{name: 'Hành động'}, {name: 'Trinh thám'}, {name:'Phiêu lưu'}],
        author: 'Itadori',
        artist: 'Sukuna',
        chapter: 1,
        type: 'Oneshow',
        follow: '111.111'
      },
    },
    {typemanga:'4', id:4, rank: '4' , image: '../assets/sakurasou.jpg', name: 'Sakurasou', type: 'Series', date: 'Oct 20012 - Sep 2017', view: '100.198', status:'Đã hoàn thành', rating: '8.14',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ,info: {
        categories: [{name: 'Hành động'}, {name: 'Trinh thám'}, {name:'Phiêu lưu'}],
        author: 'Kazuto',
        artist: 'Asuna',
        chapter: 352,
        type: 'Series',
        follow: '2.143.324'
      },
    },
    {typemanga:'5', id:1, rank: '1' , image: '../assets/hyouka.jpg', name: 'Hyouka', type: 'Series', date: 'Oct 2012 - Apr 2014', view: '119.067', status:'Đã hoàn thành', rating: '9.08',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ,info: {
        categories: [{name: 'Hành động'}, {name: 'Trinh thám'}, {name:'Phiêu lưu'}],
        author: 'Hajime',
        artist: 'Sakura',
        chapter: 52,
        type: 'Series',
        follow: '300.122'
      },
    }
  ];

  constructor(private webService: WebsiteServiceService){}
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
  UrlLink(idManga: any, namemanga: any){
    return this.webService.returnMangaUrl(idManga,namemanga);
  }
}
