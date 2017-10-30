import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ModalContentInfo } from '../models/modalContentInfoMessage';

@Component({
  selector: 'my-modal-success',
  templateUrl: 'modal-info-message.component.html',
  styleUrls: ['modal-info-message.component.css']
})
export class ModalInfoMessageComponent implements OnInit {

 @Input()
 modalContent: ModalContentInfo;

  constructor(public activeModal: NgbActiveModal,
              private router: Router) { }

  ngOnInit() {
  }

  newItem(){
    this.activeModal.close();
    location.replace(this.modalContent.newLocation);
    location.reload();
  }

  backToHome(){
    this.activeModal.close();
    this.router.navigate([this.modalContent.backToHomeLocation]);
  }
}
