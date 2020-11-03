import { Component, Input, OnInit, ViewChild } from '@angular/core';  

interface IModel {
  year?:number, 
  month?:number, 
  day?:number
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  
  @Input() placeholder_ : string;
  @Input() set_date : string;
  @Input() minDate : IModel;
  @Input() maxDate : IModel;

  model : IModel | {};

  constructor() { }

  ngOnInit(): void {

    this.set_minDate();
    this.set_maxDate();
  }
  
  minDate_default(): void{
    this.minDate = {
      year : 1970,
      month : 1,
      day : 1
    }
  }

  maxDate_default(): void{
    this.maxDate = {
      year : 2048,
      month : 12,
      day : 31
    }
  }

  set_minDate():void{
    this.minDate ? this.minDate : this.minDate_default();
  }

  set_maxDate():void{
    this.maxDate ? this.maxDate : this.maxDate_default();
  }

  setDate(date: IModel):void{  
    this.model = date ? date : {}; 
  }

  getDate():IModel{
    return this.model ? this.model : {}; 
  }

  cleanDatePicker(){
    this.model = {};
  }
 
 
}