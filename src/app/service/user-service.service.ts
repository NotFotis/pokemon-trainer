import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from '../enums/storage-keys.enums';
import { Pokemon} from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { SessionUtil } from '../utils/session.util';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _user?: Trainer;
  private _session: string | undefined;

  get user(): Trainer | undefined {
    return this._user;
  }

  set user(user: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(StorageKeys.User, user!); //save the user at local storage
    this._user = user;
  }
 
  constructor() {
    this._user = StorageUtil.storageRead<Trainer>(StorageKeys.User);
    SessionUtil.storageSave("collection",this._user?.pokemon); //saves the current collection of trainer pokemons
    if (SessionUtil.storageRead("collection") === undefined){ //if there are nothing saved at session storage by key "collection"
      this._session = "";                                     //return an empty string (undefined handling)
    }else{                                                    //session storage has something with key "collection"
      this._session = SessionUtil.storageRead("collection");  //reads the current collection of trainers pokemon
    }
    
    
   }

   public inFavourites(PokemonName: string): boolean {
    if(this._user ){
      //return true or false by checking if a pokemon is at trainers collection or not
      return Boolean(this._user?.pokemon.find((pokemon: Pokemon) => pokemon.name === PokemonName)); 
    }
    return false;
   }

   public addToFavourites(pokemon: Pokemon): void {
    if(this._user)[
      //adding the current pokemon at trainers collection
      this._user.pokemon.push(pokemon)
    ]
   }

   public removeFromFavourites(PokemonName:string): void{
    if(this._user){
      //removes the current pokemon from trainers collection
      this._user.pokemon=this._user?.pokemon.filter((pokemon: Pokemon) => pokemon.name!==PokemonName)
    }
   }
  
}
