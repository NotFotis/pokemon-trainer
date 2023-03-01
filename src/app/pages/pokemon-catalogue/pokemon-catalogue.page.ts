import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/service/pokemon-catalogue.service';
import { SessionUtil } from 'src/app/utils/session.util';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit {

  get pokemons(): Pokemon[] { return this.pokemonCatalogueService.pokemons; } //getter for pokemons data

  get loading():boolean{ return this.pokemonCatalogueService.loading; }  //flag for loading...

  get error():string{  return this.pokemonCatalogueService.error; }  //getter for error message

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService
  ){}
  
  ngOnInit(): void {
    //checking if there are pokemons data at session storage 
    //if there are data at session, load the data from there and dont fetch the api
    if (SessionUtil.storageRead("pokemons") === undefined){                                    //There are not data at session storage,
      this.pokemonCatalogueService.findAllPokemons();                                          // so take the data from api.
    }else{                                                                                     //Data exists at session storage,
      this.pokemonCatalogueService.pokemonsFromSession( SessionUtil.storageRead("pokemons") ); //so load the data from storage
    }
  }
}
 