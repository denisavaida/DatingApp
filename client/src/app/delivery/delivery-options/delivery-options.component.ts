import { Component, OnInit } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-delivery-options',
  templateUrl: './delivery-options.component.html',
  styleUrls: ['./delivery-options.component.css']
})
export class DeliveryOptionsComponent implements OnInit{
  radioButtonValues : Array<any> = ['FanCourier','UrgentCargus','DPD'];
  favoriteSeason: string = '';

  seasons = [
    'Winter',
    'Spring',
    'Summer',
    'Autumn',
  ];
  ngOnInit(): void {
  }
  radioChecked(id:any){
    this.radioButtonValues.forEach(item=>{
      if(item.id !== id){ 
         item.selected = false;
      }else{
         item.selected = true;
      } 
    })
  }
}
