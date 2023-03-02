import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private readonly pokemonService: PokemonCatalogueService,
    private readonly router: Router
  ){}

  ngOnInit(): void {
    //checking if user exists
      if(this.userService.user){

        //checking if there are pokemons data at session storage
        //if there are data at session, load the data from there and dont fetch the api
        if (SessionUtil.storageRead("collection") === undefined){                         //There are not data at session storage,
          this.pokemonService.findAllPokemons();                                        // so take the data from api.
        }else{                                                                          //Data exists at session storage,
          this.pokemonService.pokemonsFromSession(SessionUtil.storageRead("collection")); //so load the data from storage
        }

        //user exists so navigate the trainer at pokemon catalogue page
        this.router.navigateByUrl("/pokemon");
      }
  }
}
