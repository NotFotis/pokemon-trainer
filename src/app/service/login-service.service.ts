import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environmet } from 'src/environments/environment';
import { User } from '../models/user.model';

const {apiUsers, apiKey} = environmet;

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  //Dependency injection.
  constructor(private readonly http: HttpClient) {}

  public login(userame: string): Observable<User>{
    return this.checkUsername(userame)
      .pipe(
        switchMap( (user: User | undefined) => {
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
  private checkUsername(username: string): Observable<User | undefined>{
    return this.http.get<User[]>(`${apiUsers}?username=${username}`)
      .pipe(
        //RxJS operators
        map((response: User[]) => response.pop())
      )
  }

  //If not a user - Create a new user
  private createUser(username: string): Observable<User> {
    //new user
    const user = {username, favourites: []};

    //headers -> API Key
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    });

    return this.http.post<User>(apiUsers, user, { headers })
    
    //POST - Create items on the server 
  }

}
