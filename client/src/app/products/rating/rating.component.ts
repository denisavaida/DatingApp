import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit{

  @Input() maxRating = 5;
  maxRatingArr:any = [];
  @Input() SelectedStar = 0;
  previousSelection=0;
  @Output() onRating:EventEmitter<number> = new EventEmitter<number>();
  
  constructor(){

  }
  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxRating).fill(0);
  }
  HandleMouseEnter(index: number){
    this.SelectedStar = index;
  }
  HandleMouseLeave(){
    if(this.previousSelection !==0){
      this.SelectedStar = this.previousSelection;
    }else{
      this.SelectedStar = 0;
    }
  }
  Rating(index:number){
    this.SelectedStar = index+1;
    this.previousSelection = this.SelectedStar;
    this.onRating.emit(this.SelectedStar);
  }

}
