import { Component, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'Webtruyen';

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
