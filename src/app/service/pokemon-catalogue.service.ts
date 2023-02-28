import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PokemonList } from '../models/pokemon.model';
const {apiPokemon}= environment;
 
@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {
private _pokemons: PokemonList[]= [];
private _error: string="";
private _loading: boolean =false;
get pokemons(): PokemonList[]{
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
    this._loading=true;
    this.http.get<PokemonList[]>(apiPokemon)
    .pipe(
     finalize(()=>{
      this._loading=false;
     }
     )
    )
    .subscribe({
      next: (pokemons: PokemonList[]) => {
        this._pokemons = pokemons;

      },
      error: (error: HttpErrorResponse) => {
        this._error=error.message;
        

      }
    })
  }
  public pokemonByName(name: string): PokemonList | undefined{
    return this.pokemons.find((pokemon: PokemonList)=> pokemon.results.name===name)
  }
}
