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
    //checking if there are pokemons data at session storage and user exists
    //if there are data at session, load the data from there and dont fetch the api
      if(this.userService.user){
        if (SessionUtil.storageRead("pokemons") === undefined){                         //There are not data at session storage,
          this.pokemonService.findAllPokemons();                                        // so take the data from api.
        }else{                                                                          //Data exists at session storage,
          this.pokemonService.pokemonsFromSession(SessionUtil.storageRead("pokemons")); //so load the data from storage
        }
      }
  }
}
