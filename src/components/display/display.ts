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
export class DisplayComponent implements OnDestroy{

  value: number;
  operator: string;
  oldValue: number;
  calculatorProvider: CalculatorProvider;
  valueSubscription : Subscription;
  operatorSubscription: Subscription;

  constructor(cP: CalculatorProvider) {
    console.log('Hello DisplayComponent Component');
    this.calculatorProvider = cP;
    this.valueSubscription = this.calculatorProvider.GetValues().subscribe(val => 
      { 
        console.log(val);
        this.oldValue = val.valInMem;
        this.value = val.currentVal;
        this.operator = val.operator
    });
  }

  ngOnDestroy(){
    this.valueSubscription.unsubscribe();
    this.operatorSubscription.unsubscribe();
  }





}
