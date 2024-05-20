import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appScrollAnimations]'
})
export class ScrollAnimationsDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('window:scroll', ['$event'])
  checkIfVisible() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Проверяем, виден ли блок на экране
    if (rect.top < windowHeight && rect.bottom >= 0) {
      this.el.nativeElement.classList.add('active');
    } else {
      this.el.nativeElement.classList.remove('active');
    }
  }
}
