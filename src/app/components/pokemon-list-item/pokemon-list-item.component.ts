import { Component, Input, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Pokemon, PokemonList } from 'src/app/models/pokemon.model';
=======
import { Pokemon } from 'src/app/models/pokemon.model';
>>>>>>> d5020326be54c4c04961289f5d965d22f4760f17

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit{
  @Input() pokemon?:Pokemon;
  constructor(){}
  ngOnInit(): void {
      
  }

}
