import { Directive , ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private el: ElementRef) { }

  @HostListener('click')
  nextFunc(){
    var elem = this.el.nativeElement.parentElement.parentElement.children[0];
    var item = elem.getElementsByClassName("card");
    elem.append(item[0]);
  }
}
