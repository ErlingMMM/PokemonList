import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon';


@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.scss'],
})
export class PokemonCataloguePage implements OnInit {

  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList(): void {
    this.pokemonService.getPokemons()
      .subscribe(pokemonList => {
        this.pokemons = pokemonList.map(pokemon => ({
          ...pokemon,
          image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
        }));
        console.log('Fetched Pokemons:', this.pokemons);
      });
  }
}
