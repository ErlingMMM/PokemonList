import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trainer } from 'src/app/models/trainer.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-landing-form',
  templateUrl: './landing-form.component.html',
  styleUrls: ['./landing-form.component.scss']
})
export class LandingFormComponent {
  constructor(private readonly loginservice: LoginService){}

  public onSubmit(loginForm: NgForm) : void {
    const trainerName = loginForm.value.username;
    console.log("HEHE", trainerName);


    this.loginservice.loginCheck(trainerName)
    .subscribe({
      next: (trainer: Trainer) => {

      },
      error: () => {

      }
    })
    

  }
}
