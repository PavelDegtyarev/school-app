import {Injectable} from '@angular/core';
import {MathComponent} from "../math/math.component";

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor(public mathComponent: MathComponent) {
  }

  private generateNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  getExample() {
    if (this.mathComponent.formData.operation === 'multiply') {
      let multiplierFirst = this.generateNumber(this.mathComponent.formData.from, this.mathComponent.formData.before)
      let multiplierSecond = this.generateNumber(0, 9)
      let text = `${multiplierFirst} x ${multiplierSecond}`
      let answer = multiplierFirst * multiplierSecond
      return {
        text,
        answer,
      }
    }
    if (this.mathComponent.formData.operation === 'division') {
      //делитель
      let divisor = this.generateNumber(this.mathComponent.formData.from, this.mathComponent.formData.before)
      //частное
      let quotient = this.generateNumber(0, 9)
      //делимое
      let dividend = divisor * quotient

      let text =`${dividend} : ${divisor}`

      return {
        text,
        answer: quotient
      }
    }
    if (this.mathComponent.formData.operation === 'addition'){
      let summandFirst = this.generateNumber(this.mathComponent.formData.from, this.mathComponent.formData.before)
      let summandSecond = this.generateNumber(this.mathComponent.formData.from, this.mathComponent.formData.before)
      let text = `${summandFirst} + ${summandSecond}`
      let answer = summandFirst + summandSecond
      return {
        text,
        answer,
      }
    }

    //уменьшаемое
    let minuend = this.generateNumber(this.mathComponent.formData.from, this.mathComponent.formData.before)
    //вычитаемое
    let subtrahend = this.generateNumber(this.mathComponent.formData.from, this.mathComponent.formData.before)
    if (minuend < subtrahend) {
      let temp = minuend
      minuend = subtrahend
      subtrahend = temp
    }
    //частное
    let difference = minuend - subtrahend
    let text = `${minuend} - ${subtrahend}`
    return {
      text,
      answer: difference
    }
  }
}
