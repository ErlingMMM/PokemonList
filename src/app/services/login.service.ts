import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { Trainer } from '../models/trainer.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


const url = environment.apiUsers
const key = environment.apiKey

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient, private router: Router, public authService: AuthService) { }
  //method to do login check
  public loginCheck(username: string): Observable<Trainer> {
    return this.checkTrainerExist(username)
      .pipe(
        switchMap((response: Trainer | undefined) => {
          if (response === undefined) {
            return this.createTrainer(username);
          }
          return of(response);
        }),
        tap((trainer: Trainer) => {
          sessionStorage.setItem("trainer", JSON.stringify(trainer))
          this.authService.login();
          this.router.navigate(['/pokemons']);
        })
      )

  }
  //cheacking if user exists
  private checkTrainerExist(username: string): Observable<Trainer | undefined> {

    return this.http.get<Trainer[]>(`${url}?username=${username}`)
      .pipe(
        map((response: Trainer[]) => response.pop())
      )
  }
  //if user not exist creating user
  private createTrainer(username: string): Observable<Trainer> {
    console.log(username)
    const trainer = {
      username,
      pokemon: []
    };
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": key
    });

    return this.http.post<Trainer>(url, trainer, {
      headers
    })
  }
}
