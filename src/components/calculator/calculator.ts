import { Component } from '@angular/core';
import { CalculatorProvider } from '../../providers/calculator/calculator'

/**
 * Generated class for the CalculatorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorComponent {

  buttons: string[];
  constructor(calculatorProvider: CalculatorProvider) {
    this.buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '+', '='];
  }

}
