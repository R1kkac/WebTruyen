import { Component } from '@angular/core';

@Component({
  selector: 'app-topmanga',
  templateUrl: './topmanga.component.html',
  styleUrls: ['./topmanga.component.scss']
})
export class TopmangaComponent {
  Categories=[
    {id: 1, name:'All'},
    {id: 2, name:'Manga'},
    {id: 3, name:'Manhwa'},
    {id: 4, name:'Manhhua'},
    {id: 5, name:'Series'},
    {id: 6, name:'Oneshot'},
  ]
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
