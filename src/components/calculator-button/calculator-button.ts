import { Component, Input } from '@angular/core';
import { CalculatorProvider } from '../../providers/calculator/calculator';

/**
 * Generated class for the CalculatorButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'calculator-button',
  templateUrl: 'calculator-button.html'
})
export class CalculatorButtonComponent {

  @Input() value: string;
  calculatorProvider: CalculatorProvider;
  constructor(cP: CalculatorProvider) {
    this.calculatorProvider = cP;
  }

  buttonClicked(){
    console.log('button clicked ' + this.value);
    this.calculatorProvider.HandleInput(this.value);
  }

}
