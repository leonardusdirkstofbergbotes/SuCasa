import { SelectOption } from './../../../../models/selectOption';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent {

  @Input() label: string = '';
  @Input() options: SelectOption[] = [];
  @Input() activeOption: string = '';
  @Output() optionChanged: EventEmitter<SelectOption> = new EventEmitter();

  setOption (option: SelectOption) {
    this.optionChanged.emit(option);
  }
}
