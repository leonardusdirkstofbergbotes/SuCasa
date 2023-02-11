import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() title: string = '';
  public showModal: boolean = false;

  close () {
    this.showModal = false;
  }

  open () {
    this.showModal = true;
  }
}
