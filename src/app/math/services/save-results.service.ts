import {Injectable} from '@angular/core';
import {Examples} from "./history.service";

@Injectable({
  providedIn: 'root'
})
export class SaveResultsService {

  constructor() {}

  saveResult: Examples[] = []

  onSaveResult(data: Examples) {
      this.saveResult.push(data)
    console.log(this.saveResult)
    }
}
