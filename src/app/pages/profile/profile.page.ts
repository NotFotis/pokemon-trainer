import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { Result } from 'src/app/models/data.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css']
})
export class ProfilePage implements OnInit {

  get user(): Trainer | undefined{ return this.userService.user; } //getter for the trainer

  /* getter for the pokemon */
  get pokemon(): Pokemon[] {
    if(this.userService.user){             //if trainer exists
      return this.userService.user.pokemon //return the pokemon collection of the trainer
    }
    return []                              //trainer does not exists, so return an empty list 
  }
  
  logout() {
    this.userService.logout();  // call the logout method of your UserServiceService
    this.router.navigateByUrl("/login");
  }
constructor( 
  private userService: UserServiceService,
  private readonly router: Router
  ){}

ngOnInit(): void {}

}
