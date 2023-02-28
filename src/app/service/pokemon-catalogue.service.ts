import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
const {apiPokemon}= environment;
 
@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {
private _pokemons: Pokemon[]= [];
private _error: string="";
private _loading: boolean =false;
get pokemons(): Pokemon[]{
  return this._pokemons;
}
get error(): string{
  return this._error;
}
get loading():boolean{
  return this._loading;
}
  constructor(private readonly http: HttpClient) { }
  /**
   * findAllPokemons
   */
  public findAllPokemons(): void {
    if(this._pokemons.length>0 || this.loading){
      return;
    }
    this._loading=true;
    this.http.get<Pokemon[]>(apiPokemon)
    .pipe(
     finalize(()=>{
      this._loading=false;
     }
     )
    )
    .subscribe({
      next: (pokemons: Pokemon[]) => {
        this._pokemons = pokemons;

      },
      error: (error: HttpErrorResponse) => {
        this._error=error.message;
        

      }
    })
  }
  public pokemonByName(name: string): Pokemon | undefined{
    return this.pokemons.find((pokemon: Pokemon)=> pokemon.name===name)
  }
}
