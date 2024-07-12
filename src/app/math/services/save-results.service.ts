import {Injectable} from '@angular/core';
import {Examples} from "./history.service";

@Injectable({
  providedIn: 'root'
})
export class SaveResultsService {

  constructor() {}

  saveResult: Examples  = {
    items: [],


  }

  onSaveResult(data: {}) {
      // @ts-ignore
    this.saveResult.items.push(data)
    console.log(this.saveResult)
    }
}
