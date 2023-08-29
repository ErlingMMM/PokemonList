import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.scss'],
})
export class PokemonCataloguePage implements OnInit {

  pokemons: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList(): void {
    this.pokemonService.getPokemons()
      .subscribe(pokemonList => {
        this.pokemons = pokemonList.map((pokemon, index) => ({
          ...pokemon,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
          catched: false
        }));
        console.log('Fetched Pokemons:', this.pokemons);
      });
  }

  saveIndexAndName(name: string, index: number): void {
    console.log('Clicked on Pokémon with name:', name);

    const data = {
      name: name,
      index: index + 1,
    };

    this.http.post("https://assigment2-api-production.up.railway.app/trainers", data, {
      headers: {
        'Authorization': `Bearer jP9kL7Hn3RmTqAeWsZcXvYbUgIaOpEfDhCtVrFmNlYbUiTsWxZaQpOeHdCfGjK`
      }
    }).subscribe(
      response => {
        console.log('API Response:', response);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  markAsCatched(pokemon: Pokemon, index: number): void {
    console.log('Marked as catched:', pokemon.name);
    console.log('Index of the Pokémon:', index);
    pokemon.catched = true; 
  }

}
