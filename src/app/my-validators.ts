import {AbstractControl, FormGroup, ValidatorFn} from "@angular/forms";


export class MyValidators{
  // @ts-ignore
  static fromLessTo: ValidatorFn = function fromLessTo(fg: FormGroup): {[key: string]: boolean} | null{
    const min: AbstractControl | null = fg.get('from')
    const max: AbstractControl | null = fg.get('to')
    // console.log('fromTo: ', min?.value, max?.value)
    if (min && max && max.value < min.value) {
      return  {minMoreMax: true}
    }
    return null
  }
}



