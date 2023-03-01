import { Component, OnInit } from '@angular/core';
import { PokemonCatalogueService } from './service/pokemon-catalogue.service';
import { UserServiceService } from './service/user-service.service';
import { SessionUtil } from './utils/session.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private readonly userService: UserServiceService,
    private readonly pokemonService: PokemonCatalogueService
  ){}

  ngOnInit(): void {
      if(this.userService.user){
        if (SessionUtil.storageRead("pokemons") === undefined){
          this.pokemonService.findAllPokemons();
        }else{
          this.pokemonService.pokemonsFromSession( SessionUtil.storageRead("pokemons") );
        }
      }
  }
}
