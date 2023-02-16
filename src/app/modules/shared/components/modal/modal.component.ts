import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() title: string = '';
  @Input() loading: boolean = false;
  public showModal: boolean = false;
  @Output() closed: EventEmitter<boolean> = new EventEmitter();

  close () {
    this.showModal = false;
    this.closed.emit(true);
  }

  open () {
    this.showModal = true;
  }
}
