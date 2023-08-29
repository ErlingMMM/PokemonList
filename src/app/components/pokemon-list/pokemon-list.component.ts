import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList(): void {
    this.pokemonService.getPokemons()
      .subscribe(pokemonList => {
        this.pokemons = pokemonList;
        this.fetchPokemonDetails();
      });
  }

  fetchPokemonDetails(): void {
    this.pokemons.forEach(pokemon => {
      this.pokemonService.getPoekomonByName(pokemon.name)
        .subscribe(details => {
          pokemon.sprites = details.sprites;
          pokemon.image = details.sprites?.front_default;
        });
    });
  }
}
