import { CalculatorProvider } from './calculator';
import { TestBed } from '@angular/core/testing';

describe('Doing addition tests', () => {
    var calculator = new CalculatorProvider();

    it('1 + 1', ()=> {
        expect(calculator.Add(1,1)).toBe(2);
    });
    it('5 + 6', ()=> {
        expect(calculator.Add(5,6)).toBe(11);
    });
})