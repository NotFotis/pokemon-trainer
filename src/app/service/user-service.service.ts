import { Injectable } from '@angular/core';
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
    StorageUtil.storageSave<Trainer>(StorageKeys.User, user!);
    this._user = user;
  }

  constructor() {
    this._user = StorageUtil.storageRead<Trainer>(StorageKeys.User);
    SessionUtil.storageSave("collection",this._user?.pokemon); //saves the current collection of trainer pokemons
    if (SessionUtil.storageRead("collection") === undefined){
      this._session = "";
    }else{
      this._session = SessionUtil.storageRead("collection"); //reads the current collection of trainers pokemon
    }
    
   }

   public inFavourites(PokemonName: string): boolean {
    if(this._user ){
      console.log(JSON.stringify( this._session));
      
      return Boolean(this._user?.pokemon.find((pokemon: Pokemon) => pokemon.name === PokemonName)); 
    }
    return false;
   }

   public addToFavourites(pokemon: Pokemon): void {
    if(this._user)[
      this._user.pokemon.push(pokemon)
    ]
   }

   public removeFromFavourites(PokemonName:string): void{
    if(this._user){
      this._user.pokemon=this._user?.pokemon.filter((pokemon: Pokemon) => pokemon.name!==PokemonName)
    }
   }
}
