import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-catch-button',
  templateUrl: './catch-button.component.html',
  styleUrls: ['./catch-button.component.css']
})
export class CatchButtonComponent {

  @Input() pokemonId: number = -1; //initiate the number to none id

  onCatchClick(): void {
    //add the pokemon to the trainers' list
    alert("Oh yeah, you got it! " + this.pokemonId );
  }

}
