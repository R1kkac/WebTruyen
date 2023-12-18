import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-topmanga',
  templateUrl: './topmanga.component.html',
  styleUrls: ['./topmanga.component.scss']
})
export class TopmangaComponent {
  Categories=[
    {id: '0', name:'All'},
    {id: '1', name:'Oneshot'},
    {id: '2', name:'Series'},
    {id: '3', name:'Doujinshi'},
    {id: '4', name:'Manhwa'},
    {id: '5', name:'Manhua'},
  ]
  constructor(private title: Title){
    this.title.setTitle('Xếp hạng truyện - Tất cả');
  }
  changestyle(event: any){
    const elements= document.querySelectorAll('.categories') as NodeListOf<HTMLElement>;

    const element = event.target.closest('.categories');
    elements.forEach((item: HTMLElement)=>{
      if(item=== element){
        const a= item.querySelector('a') as HTMLElement;
        a.style.color = 'white';
        item.style.backgroundColor = 'blue';
      }
      else{
        const a= item.querySelector('a') as HTMLElement;
        a.style.color = 'rgb(5, 5, 249 ,.8)';
        item.style.backgroundColor = 'white';
      }
    })
  }
}
