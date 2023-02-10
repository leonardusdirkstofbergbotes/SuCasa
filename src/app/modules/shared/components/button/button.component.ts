import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() type: string = 'primary'; // primary|secondary
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;

}
