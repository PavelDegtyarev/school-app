import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-end-game',
  standalone: true,
  imports: [],
  templateUrl: './end-game.component.html',
  styleUrl: './end-game.component.css'
})
export class EndGameComponent {
  @Output() closeEndGame = new EventEmitter()
  close() {
    this.closeEndGame.emit()
  }
}
