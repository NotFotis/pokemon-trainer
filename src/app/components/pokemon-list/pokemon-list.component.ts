import { Component, Input, OnInit } from '@angular/core';
<<<<<<< HEAD
import {  Pokemon, PokemonList } from 'src/app/models/pokemon.model';
=======
import {  Pokemon } from 'src/app/models/pokemon.model';
>>>>>>> d5020326be54c4c04961289f5d965d22f4760f17

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{
  @Input() pokemons:Pokemon[]=[];
  constructor(){}
  ngOnInit(): void {
      
  }

}
