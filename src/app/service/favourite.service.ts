import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
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

  public addToFavourtites(PokemonName: string): Observable<Trainer> {
    if(!this.userService.user){
      throw new Error("There is no user");
      
    }
    const user: Trainer =this.userService.user;
    const pokemon : Pokemon | undefined = this.pokemonService.pokemonByName(PokemonName);
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

      let pokemonList = user.pokemon;           //initiating the list with the already caught pokemons
      if (!pokemonList.includes(PokemonName)){  //if this pokemon is not at the list
        pokemonList.push(PokemonName);          //add the pokemon to the list
      }
      

    return this.http.patch<Trainer>(`${apiUsers}/${user.id}`,{
      pokemon: pokemonList  //add the updated list at the api
    },{
      headers
    })
    .pipe(
      tap((updatedUser: Trainer)=>{
        this.userService.user=updatedUser;
      }),
      finalize(() => {
        this._loading = false;
      })
    )

  }
}
