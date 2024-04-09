import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss'],
})
export class ModalDeleteComponent {

  /* eslint-disable @angular-eslint/no-output-native */
  @Output() result = new EventEmitter<string>();

  constructor(public activeModal: NgbActiveModal) {}

  confirmDeletion(): void {
    this.result.emit('confirm');
    this.activeModal.close();
  }

  cancelDeletion(): void {
    this.activeModal.dismiss();
  }

}
