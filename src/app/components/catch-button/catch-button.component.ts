import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { FavouriteService } from 'src/app/service/favourite.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-catch-button',
  templateUrl: './catch-button.component.html',
  styleUrls: ['./catch-button.component.css']
})
export class CatchButtonComponent implements OnInit{
  public loading : boolean=false;
  public isFavourite: boolean = false;

  @Input() PokemonName: string = ""; //initiate the number to none id

  // get loading(): boolean{
  //   return this.favouriteService.loading;
  // }
  
constructor(
  private userService: UserServiceService,
  private readonly favouriteService: FavouriteService
){}

ngOnInit(): void {
    //inputs are resolved
    this.isFavourite = this.userService.inFavourites(this.PokemonName);
}

  onCatchClick(): void {
    this.loading=true;
    this.favouriteService.addToFavourites(this.PokemonName)
    .subscribe({
      next:(response: Trainer) =>{
        this.loading=false;
          console.log("NEXT", response);
          
      },
      error:(error: HttpErrorResponse) => {
        console.log("ERROR", error.message);
        
      }
    })
    //the pokemon added to the trainers' list
    alert("Oh yeah, you got it! " + this.PokemonName );
  }

}
