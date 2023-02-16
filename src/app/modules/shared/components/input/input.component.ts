import { FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() label: string = "";
  @Input() control: FormControl = new FormControl();
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() tooltip: string | null = null;
  @Input() type: string = "text";
  @Input() autocomplete: boolean = false;
  @Input() rows: number = 2;
}
