import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the CalculatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CalculatorProvider {

  private data: any;
  private subject: Subject<any>;

  constructor() {
    console.log('Hello CalculatorProvider');
    this.subject = new Subject<any>();
    this.data = {};
    this.data.decimalHit = false;
    this.data.currentVal = 0;
  }

  public GetValues(): Observable<any> {
    return this.subject.asObservable();
  }

  private SetCurrentVal(x: number) {
    this.data.currentVal = x;
    this.subject.next(this.data);
  }

  private SetOperator(operator: string) {
    this.data.operator = operator;
    this.subject.next(this.data);
  }

  public HandleInput(input: string) {
    console.log('handling input: ' + input);
    var x;

    if (this.data.decimalHit) {
      x = this.data.currentVal + "." + input;
      console.log(x);
    } else {
      if (this.data.currentVal === undefined) {
        x = input;
      } else {
        x = this.data.currentVal + input;
      }
    }
    if (!isNaN(x) && input != ".") {
      this.SetCurrentVal(parseFloat(x));
      console.log('currentVal ' + this.data.currentVal);
      this.data.decimalHit = false;
      return;
    }
    switch (input) {
      case "=":
        this.ExecuteCalculation();
        break;
      case ".":
        console.log('hit decimal');
        this.data.decimalHit = true;
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        this.SetOperator(input);
        this.data.valInMem = this.data.currentVal;
        this.SetCurrentVal(undefined);
        break;
      default:
    }
  }

  private ExecuteCalculation() {

    var result = this.Calculate(this.data.valInMem, this.data.currentVal, this.data.operator);
    this.data.operator = '';
    this.data.valInMem = undefined;
    this.SetCurrentVal(result);
  }

  public Calculate(first: number, second: number, operator: string) {
    console.log('Calculating');
    switch (operator) {
      case "+":
        return this.Add(first, second);
      case "-":
        return this.Substract(first, second);
      case "*":
        return this.Multiply(first, second);
      case "/":
        return this.Devide(first, second);
    }
  }



  Add(first: number, second: number) {
    var result = first + second;
    console.log('Add ' + first + ' & ' + second + ' = ' + result);
    return result;
  }

  Substract(first: number, second: number) {
    var result = first - second;
    console.log('Substract ' + first + ' & ' + second + ' = ' + result);
    return result;
  }

  Multiply(first: number, second: number) {
    var result = first * second;
    console.log('Multiply ' + first + ' & ' + second + ' = ' + result);
    return result;
  }

  Devide(first: number, second: number) {
    var result = first / second;
    console.log('Devide ' + first + ' & ' + second + ' = ' + result);
    return result;
  }

}
