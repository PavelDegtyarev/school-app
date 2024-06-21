import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  @Input() response!: {text: string, right: boolean}
  @Output() nextExample = new EventEmitter()
  next() {
    this.nextExample.emit()
    console.log(this.response)
  }
}
