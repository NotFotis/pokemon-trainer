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

  get pokemons(): Pokemon[] {
    return this.pokemonCatalogueService.pokemons;
  }

  get loading():boolean{
    return this.pokemonCatalogueService.loading;
  }

  get error():string{
    return this.pokemonCatalogueService.error;
  }

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService
  ){}
  
  ngOnInit(): void {
    if (SessionUtil.storageRead("pokemons") === undefined){
      this.pokemonCatalogueService.findAllPokemons();
    }else{
      this.pokemonCatalogueService.pokemonsFromSession( SessionUtil.storageRead("pokemons") );
    }
  }
}
 