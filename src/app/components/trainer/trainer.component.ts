import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit {
  trainerData: any; 

  ngOnInit(): void {
    this.trainerData = sessionStorage.getItem('trainer');
    console.log("tttt", this.trainerData)
    if (this.trainerData) {
      this.trainerData = JSON.parse(this.trainerData);
    }
  }
}
