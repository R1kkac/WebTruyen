import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[appAvatarError]'
})
export class AvatarErrorService {

  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @HostListener('error', ['$event.target'])
  onError(img: HTMLImageElement): void {
    this.renderer.setAttribute(img, 'src', '/assets/user.jpg');
  }
}
