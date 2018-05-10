import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Generated class for the VariableComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'variable',
  templateUrl: 'variable.html'
})
export class VariableComponent {

  @Input('group')
  public variableForm: FormGroup;

  constructor() {
    //console.log('Hello VariableComponent Component');
    //this.text = 'Hello World';
  }

}
