import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'my-modal-success',
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.css']
})
export class ModalSuccessComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
              private router: Router) { }

  ngOnInit() {
  }

  test(){
    this.activeModal.close();
    this.router.navigate(['/cashboxes']);
  }
}
