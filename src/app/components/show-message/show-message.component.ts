import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalManager } from 'ngb-modal'

@Component({
  selector: 'app-error-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.css']
})
export class ShowMessageComponent implements OnInit {

  @ViewChild('btn_footer_modal')  btn_footer_modal : HTMLInputElement;
  @ViewChild('modal_message') modal_message;
  @Input() message : string = "Message Example";
  @Input() title : string ="Example";
  
  private modalRef;

  constructor(private modalService: ModalManager) { }

  ngOnInit(): void {
  }

  openModal(){
    this.modalRef = this.modalService.open(this.modal_message, this.configureModal());
  }

  closeModal(){
     this.modalService.close(this.modalRef);
  } 

  getTitle(){
    return this.title;
  }
  configureModal(){
    return {
      "title": this.getTitle(),
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

}
