import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'translatePipe',
  standalone: true
})
export class TranslatePipe implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case 'multiply': return 'Умножение'
      case 'division': return 'Деление'
      case 'addition': return 'Сложение'
      case 'subtraction': return 'Вычитание'
    }
  }

}
