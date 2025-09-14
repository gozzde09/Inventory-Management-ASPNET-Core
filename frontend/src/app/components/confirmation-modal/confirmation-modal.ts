import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../../interfaces/item-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.html',
})
export class ConfirmationModal {
  @Input() item!: Item;

  constructor(public activeModal: NgbActiveModal) {}

  onConfirm(): void {
    this.activeModal.close(true);
  }

  onCancel(): void {
    this.activeModal.dismiss(false);
  }
}
