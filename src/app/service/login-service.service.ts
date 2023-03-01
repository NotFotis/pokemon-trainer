import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';

const {apiUsers, apiKey} = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  //Dependency injection.
  constructor(private readonly http: HttpClient) {}

  public login(userame: string): Observable<Trainer>{
    return this.checkUsername(userame)
      .pipe(
        switchMap( (user: Trainer | undefined) => {
          if (user === undefined){ //user does not exists 
            return this.createUser(userame); //create a new user
          }
          //user exists
          return of(user); //return the user
        })
      )
  }

  //Login

  //Check if user exists
  private checkUsername(username: string): Observable<Trainer | undefined>{
    return this.http.get<Trainer[]>(`${apiUsers}?username=${username}`)
      .pipe(
        //RxJS operators
        map((response: Trainer[]) => response.pop())
      )
  }

  //If not a user - Create a new user
  private createUser(username: string): Observable<Trainer> {
    //new user
    const user = {username, pokemon: []};

    //headers -> API Key
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    });

    return this.http.post<Trainer>(apiUsers, user, { headers })
    
    //POST - Create items on the server 
  }

}
