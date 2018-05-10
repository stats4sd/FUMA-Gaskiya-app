import { NgModule } from '@angular/core';
import { DonneeComponent } from './donnee/donnee';
import { VariableComponent } from './variable/variable';
import { VariablesEssaiComponent } from './variables-essai/variables-essai';
import { AttributProtocoleComponent } from './attribut-protocole/attribut-protocole';
@NgModule({
	declarations: [DonneeComponent,
    VariableComponent,
    VariablesEssaiComponent,
    AttributProtocoleComponent],
	imports: [],
	exports: [DonneeComponent,
    VariableComponent,
    VariablesEssaiComponent,
    AttributProtocoleComponent]
})
export class ComponentsModule {}
