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
  
constructor(
  private userService: UserServiceService,
  private readonly favouriteService: FavouriteService
){}

ngOnInit(): void {
    //inputs are resolved
    //checking for every pokemon if it is already in collection of the trainer
    this.isFavourite = this.userService.inFavourites(this.PokemonName);
}

  onCatchClick(): void {
    this.loading=true;
    this.favouriteService.addToFavourites(this.PokemonName)
    .subscribe({
      next:(response: Trainer) =>{
        this.loading=false;
        window.location.reload();
          console.log("NEXT", response);
          
      },
      error:(error: HttpErrorResponse) => {
        console.log("ERROR", error.message);
        
      }
    })
    //the pokemon added to the trainers' list
    //Checking if the selected pokemon is at collection list to show the proper alert message 
    if( this.isFavourite ){  //it is at the collection  
      alert(`You have succesfully released the pokemon ${this.PokemonName} from your collection!`);
    }else{                   //it is not at the collection 
      alert(`Oh yeah, you got it! Now ${this.PokemonName} belongs to your pokemons colllection!`);
    }
  }

}
