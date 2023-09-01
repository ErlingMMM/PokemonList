import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  // Array declared for storing Pokemon data from model
  pokemons: Pokemon[] = [];

  // Constructor for service
  constructor(private pokemonService: PokemonService) { }

  //Lifecycle for component
  ngOnInit(): void {
    //Run function for listing the Pokemons when the component is initialized
    this.getPokemonList();
  }

  //Fetch the list of Pokemons
  getPokemonList(): void {
    this.pokemonService.getPokemons()
      .subscribe(pokemonList => {
        this.pokemons = pokemonList;
      });
  }
}
