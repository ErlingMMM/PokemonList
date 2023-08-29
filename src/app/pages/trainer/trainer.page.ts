import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.scss']
})
export class TrainerPage implements OnInit {

  pokemons: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getPokemonTrainerList();
  }

  getPokemonTrainerList(): void {
    this.pokemonService.getTrainerPokemons()
      .subscribe(pokemonList => {
        if (pokemonList) {
          this.pokemons = pokemonList.map((pokemon) => ({
            ...pokemon,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.index}.png`,
          }));
        } else {
          console.error('Pokemon list is undefined.');
        }
      });
  }
}