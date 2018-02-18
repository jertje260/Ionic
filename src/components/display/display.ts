import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { CalculatorProvider } from '../../providers/calculator/calculator'


/**
 * Generated class for the DisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'display',
  templateUrl: 'display.html',
})
export class DisplayComponent{

  value: number;
  operator: string;
  oldValue: number;
  calculatorProvider: CalculatorProvider;
  valueSubscription : Subscription;
  operatorSubscription: Subscription;

  constructor(cP: CalculatorProvider) {
    console.log('Hello DisplayComponent Component');
    this.calculatorProvider = cP;
    var values = this.calculatorProvider.GetValues();
    this.oldValue = values.valInMem;
    this.value = values.currentVal;
    this.operator = values.operator;
    this.valueSubscription = this.calculatorProvider.GetValuesObserver().subscribe(val => 
      { 
        console.log(val);
        this.oldValue = val.valInMem;
        this.value = val.currentVal;
        this.operator = val.operator
    });
  }
}
