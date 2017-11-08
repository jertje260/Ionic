import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorButtonComponent } from './calculator-button/calculator-button';
import { DisplayComponent } from './display/display';
import { CalculatorComponent } from './calculator/calculator';

@NgModule({
	declarations: [CalculatorButtonComponent,
    DisplayComponent,
    CalculatorComponent],
	imports: [CommonModule],
	exports: [CalculatorButtonComponent,
    DisplayComponent,
    CalculatorComponent]
})
export class ComponentsModule {}
