import { Directive, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[heart-icon]'
})
export class HeartIconDirective {

	class: Array<string> = [
		"far",
		"fa-heart"
	]

	constructor(private renderer: Renderer2,
               private elementRef: ElementRef) {
		for(let i = 0; i < this.class.length; i++)
			this.renderer.addClass(this.elementRef.nativeElement, this.class[i]);
	}

}
