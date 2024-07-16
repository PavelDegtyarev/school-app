import {Injectable} from '@angular/core';
import {Exercise} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class SaveResultsService {

  constructor() {}

  saveResult: Exercise  = {
    items: [],


  }

  onSaveResult(data: {}) {
      // @ts-ignore
    this.saveResult.items.push(data)
    console.log(this.saveResult)
    }
}
