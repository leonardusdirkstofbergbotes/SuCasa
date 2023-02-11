import { FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent {

  @Input() control: FormControl = new FormControl();
  @Input() label: string = "";

  toggleSwitch () {
    console.log('switch');
    this.control.setValue(!this.control.value);
  }
}
