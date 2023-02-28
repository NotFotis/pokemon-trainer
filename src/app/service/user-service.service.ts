import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enums';
import { PokemonList} from '../models/pokemon.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _user?: User;

  get user(): User | undefined {
    return this._user;
  }

  set user(user: User | undefined) {
    StorageUtil.storageSave<User>(StorageKeys.User, user!);
    this._user = user;
  }

  constructor() {
    this._user = StorageUtil.storageRead<User>(StorageKeys.User);
   }

   public inFavourites(PokemonName: string): boolean {
    // if(this._user ){

    //   return Boolean(this.user?.favourites.find((pokemon: Pokemon) => pokemon.name === PokemonName));

    // }
    return false;
   }
}
