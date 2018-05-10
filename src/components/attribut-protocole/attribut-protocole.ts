import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Generated class for the AttributProtocoleComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'attribut-protocole',
  templateUrl: 'attribut-protocole.html'
})
export class AttributProtocoleComponent {

  @Input('group')
  public attributForm: FormGroup;

  constructor() {
  }

}
