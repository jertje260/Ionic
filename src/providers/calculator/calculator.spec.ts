import { CalculatorProvider } from './calculator';

var calculator = new CalculatorProvider();

describe('Doing addition tests', () => {
    it('1 + 1', ()=> {
        expect(calculator.Add(1,1)).toBe(2);
    });
    it('5 + 6', ()=> {
        expect(calculator.Add(5,6)).toBe(11);
    });
});
describe('Doing substraction tests', () => {
    it('1 - 1', ()=>{
        expect(calculator.Substract(1,1)).toBe(0);
    });
    it('12 - 5', ()=>{
        expect(calculator.Substract(12,5)).toBe(7);
    });
    it('1 - 15', ()=>{
        expect(calculator.Substract(1,15)).toBe(-14);
    });
})

describe('Doing multiplication tests', () => {
    it('1 0* 1', ()=>{
        expect(calculator.Multiply(1,1)).toBe(1);
    });
    it('2 * 5', ()=>{
        expect(calculator.Multiply(2,5)).toBe(10);
    });
    it('12 * 15', ()=>{
        expect(calculator.Multiply(20,15)).toBe(300);
    });
})

describe('Doing division tests', () => {
    it('1 / 1', ()=>{
        expect(calculator.Devide(1,1)).toBe(1);
    });
    it('2 / 5', ()=>{
        expect(calculator.Devide(2,5)).toBe(0.4);
    });
    it('100 / 5', ()=>{
        expect(calculator.Devide(100,5)).toBe(20);
    });
    it('10 / 2.5', ()=>{
        expect(calculator.Devide(10,2.5)).toBe(4);
    });
})