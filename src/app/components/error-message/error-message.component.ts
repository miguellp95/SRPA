import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalManager } from 'ngb-modal'

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  @Input('error-message') message_error : string;
  @ViewChild('btn_footer_modal')  btn_footer_modal : HTMLInputElement;
  @ViewChild('modal_error') modal_error;
  private modalRef;

  constructor(private modalService: ModalManager) { }

  ngOnInit(): void { 
  }

  openModal(){
    this.modalRef = this.modalService.open(this.modal_error, this.config);
    console.log("funciona");
  }

  closeModal(){
     this.modalService.close(this.modalRef);
  }

  config = {
    "title": "Error",
    "size": "md",
    "modalClass": "",
    "hideCloseButton": false,
    "centered": false,
    "backdrop": true,
    "animation": true,
    "keyboard": true,
    "closeOnOutsideClick": false,
    "backdropClass": "modal-backdrop"
}
}
