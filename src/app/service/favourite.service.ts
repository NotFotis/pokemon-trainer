import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PokemonList } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { UserServiceService } from './user-service.service';

const {apiKey, apiUsers} = environment;

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
private _loading: boolean =false;
get loading(): boolean{
  return this._loading;
}
  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonCatalogueService,
    private readonly  userService: UserServiceService
  ) { }

  public addToFavourtites(PokemonName: string): Observable<User> {
    if(!this.userService.user){
      throw new Error("There is no user");
      
    }
    const user: User =this.userService.user;
    const pokemon : PokemonList | undefined = this.pokemonService.pokemonByName(PokemonName);
    if(!pokemon){
      throw new Error("No pokemon with name:" + PokemonName);
      
    }

    if(this.userService.inFavourites(PokemonName)){
      throw new Error("Pokemon already in favourites");
    }

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey
    })

      this._loading=true;

    return this.http.patch<User>(`${apiUsers}/${user.id}`,{
      favourites:[...user.favourites,pokemon]
    },{
      headers
    })
    .pipe(
      tap((updatedUser: User)=>{
        this.userService.user=updatedUser;
      }),
      finalize(() => {
        this._loading = false;
      })
    )

  }
}
