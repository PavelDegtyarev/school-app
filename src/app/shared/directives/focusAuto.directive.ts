import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  OnChanges,
  OnInit
} from "@angular/core";

@Directive({
  selector: '[appFocusAuto]',
  standalone: true
})
export class FocusAutoDirective implements AfterViewChecked {
  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewChecked() {
    this.elementRef.nativeElement.focus()
  }
}
