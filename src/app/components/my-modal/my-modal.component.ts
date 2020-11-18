import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent implements OnInit {

  @Input() visible : boolean;
  @Input() title : string;
  
  @Output() close_modal : EventEmitter<boolean> = new EventEmitter(); 
  
  constructor() { }

  ngOnInit(): void { 
  }
  
  closeModal()
  {
    this.close_modal.emit(false);
  }
}
