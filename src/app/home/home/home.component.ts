import { Component, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit{
  @ViewChild('header') Header!: ElementRef;
  IsViewHeader=true;
  isAtTop = false;
  private Headerheight=0;

  ngAfterViewInit(): void {
    this.Headerheight = this.Header.nativeElement.offsetHeight;
  }
  @HostListener('window: scroll', [])
  onWindowScroll(){
    let currentScrollTop = document.documentElement.scrollTop;
    //thay đổi style của hotkey element
    if(currentScrollTop > this.Headerheight){
      this.isAtTop = true;
    }
    else{
      this.isAtTop=false;
    }
  };
}
