import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appFocusOnShow]'
})
export class FocusOnShowDirective implements OnInit {

  constructor(private el: ElementRef) {
    if (!el.nativeElement['focus']) {
      throw new Error('Elemento no acepta focus.');
    }
   }

  ngOnInit(): void {
    const input: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
    input.focus();
    input.select();
  }

}
