import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit {
  trainerData: any; 

  ngOnInit(): void {
    //retriving trainerData from sessionStorage
    this.trainerData = sessionStorage.getItem('trainer');
    console.log("tttt", this.trainerData)
    if (this.trainerData) {
      //if trainer data exists, parse it into JSON format
      this.trainerData = JSON.parse(this.trainerData);
    }
  }
}
