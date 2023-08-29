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
    localStorage.setItem("trainer", "Erling"); //remove this when loginpage is complete is completed
    this.pokemonService.getPokemons()
      .subscribe(pokemonList => {
        this.pokemons = pokemonList.map((pokemon, index) => ({
          ...pokemon,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
          catched: false
        }));
      });
  }

  catchAndSave(pokemon: Pokemon, index: number): void {
    const trainer = localStorage.getItem("trainer");
    const data = {
      name: pokemon.name,
      trainer: trainer,
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
        pokemon.catched = true;
        alert("Catched!")
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
