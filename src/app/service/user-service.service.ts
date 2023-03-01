import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enums';

import { Pokemon} from '../models/pokemon.model';

import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _user?: Trainer;

  get user(): Trainer | undefined {
    return this._user;
  }

  set user(user: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(StorageKeys.User, user!);
    this._user = user;
  }

  constructor() {
    this._user = StorageUtil.storageRead<Trainer>(StorageKeys.User);
   }

   public inFavourites(PokemonName: string): boolean {
    if(this._user ){

      // return Boolean(this.user?.pokemon.find((pokemon: Pokemon) => pokemon.name === PokemonName));

    }
    return false;
   }

   public addToFavourites(pokemon: Pokemon): void {
    if(this._user)[
      this._user.pokemon.push(pokemon.name)
    ]
   }

   public removeFromFavourites(PokemonName:string): void{
    if(this._user){
      this._user.pokemon=this._user.pokemon.filter((pokemon: Pokemon) => pokemon.name!==PokemonName)
    }
   }
}
