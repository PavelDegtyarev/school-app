import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService{

  formData!: {from: number, before: number, operation: string, numberExamples: number}
  private generateNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  setCondition(data: {from: number, before: number, operation: string, numberExamples: number}) {
    this.formData = data
  }
  getExample() {
    if (this.formData.operation === 'multiply') {
      let multiplierFirst = this.generateNumber(this.formData.from, this.formData.before)
      let multiplierSecond = this.generateNumber(0, 9)
      let text = `${multiplierFirst} x ${multiplierSecond}`
      let answer = multiplierFirst * multiplierSecond
      return {
        text,
        answer,
      }
    }
    if (this.formData.operation === 'division') {
      //делитель
      let divisor = this.generateNumber(this.formData.from, this.formData.before)
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
    if (this.formData.operation === 'addition'){
      let summandFirst = this.generateNumber(this.formData.from, this.formData.before)
      let summandSecond = this.generateNumber(this.formData.from, this.formData.before)
      let text = `${summandFirst} + ${summandSecond}`
      let answer = summandFirst + summandSecond
      return {
        text,
        answer,
      }
    }

    //уменьшаемое
    let minuend = this.generateNumber(this.formData.from, this.formData.before)
    //вычитаемое
    let subtrahend = this.generateNumber(this.formData.from, this.formData.before)
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
