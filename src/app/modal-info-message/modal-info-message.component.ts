import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ModalContentInfoMessage } from '../models/modalContentInfoMessage';

@Component({
  selector: 'my-modal-success',
  templateUrl: 'modal-info-message.component.html',
  styleUrls: ['modal-info-message.component.css']
})
export class ModalInfoMessageComponent implements OnInit {

 @Input()
 modalContent: ModalContentInfoMessage;

  constructor(public activeModal: NgbActiveModal,
              private router: Router) { }

  ngOnInit() {
  }

  newItem(){
    this.activeModal.close();
    location.reload();
  }

  backToHome(){
    this.activeModal.close();
    this.router.navigate(['/cashboxes']);
  }

  test(){
    this.activeModal.close();
    this.router.navigate(['/cashboxes']);
  }
}
