import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveResultsService {

  constructor() {}

  saveResult: Array<{text: string, answer: number, studentAnswer: number, right: boolean}> = [
  ]

  onSaveResult(data: {text: string, answer: number, studentAnswer: number, right: boolean}) {
      this.saveResult.push(data)
    console.log(this.saveResult)
    }
}
