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
  buttonText = 'gotta catch (em all)';

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

  catchAndSave(pokemon: Pokemon, index: number): void {
    console.log('Caught and saved Pokémon:', pokemon.name);
    console.log('Index of the Pokémon:', index);

    const data = {
      name: pokemon.name,
      index: index + 1,
    };

    const apiKey = 'jP9kL7Hn3RmTqAeWsZcXvYbUgIaOpEfDhCtVrFmNlYbUiTsWxZaQpOeHdCfGjK';

    this.http.post("https://assigment2-api-production.up.railway.app/trainers", data, {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    }).subscribe(
      response => {
        console.log('API Response:', response);
        pokemon.catched = true; 
        alert("Catched!")
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
