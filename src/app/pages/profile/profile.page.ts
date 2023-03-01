import { Component, OnInit } from '@angular/core';
import { Data, Result } from 'src/app/models/data.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css']
})
export class ProfilePage implements OnInit {
  get user(): Trainer | undefined{

    return this.userService.user;
  }
  get favourites(): Pokemon[]{
    if(this.userService.user){
      // return this.userService.user.favourites
    }
    return [];
  }
constructor(
  private userService: UserServiceService
){}
ngOnInit(): void {
    
}
}
