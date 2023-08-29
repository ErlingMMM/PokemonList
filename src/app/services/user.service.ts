import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient: HttpClient) { }

  // private User
  private user: User = {
    firstName: "unknown",
    img: "none"
  }

  // getter
  get User(): User {
    return this.user
  }

  set User(newUser:User) {
    this.user = newUser
  }


  // set up

  getSampleUser(): void {
    this.httpClient.get<any>("https://randomuser.me/api/")
      .pipe(
        map(userSampleData => {
          let newUser: User = {
            firstName: userSampleData.results[0].name.first,
            img: userSampleData.results[0].picture.medium
          }

          return newUser
        })

      )
      .subscribe({
        next: (userData: User) => {
          this.user = userData 
        },
        error: error => console.log(error)
      })


  }

}
