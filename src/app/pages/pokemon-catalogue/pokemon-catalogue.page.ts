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
    localStorage.setItem("trainer", "Magnus"); // remove this when login page is complete
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
  
    if (trainer !== null) {
      const apiKey = 'jP9kL7Hn3RmTqAeWsZcXvYbUgIaOpEfDhCtVrFmNlYbUiTsWxZaQpOeHdCfGjK';
  
      this.http.get(`https://assigment2-api-production.up.railway.app/trainers?name=${trainer}`, {
        headers: {
          'X-API-Key': apiKey
        }
      }).subscribe(
        (response: any) => {
          if (response.length === 0) {
            this.createTrainerAndAddPokemon(trainer, pokemon, index, apiKey);
          } else {
            const existingTrainer = response[0];
            this.addPokemonToTrainer(existingTrainer.id, pokemon, index, apiKey);
          }
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Trainer is null.');
    }
  }
  

  createTrainerAndAddPokemon(trainer: string, pokemon: Pokemon, index: number, apiKey: string): void {
    const trainerData = {
      trainer: trainer,
      pokemons: [
        {
          name: pokemon.name,
          index: index + 1
        }
      ]
    };

    this.http.post("https://assigment2-api-production.up.railway.app/trainers", trainerData, {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    }).subscribe(
      response => {
        pokemon.catched = true;
        alert("Caught!")
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  addPokemonToTrainer(trainerId: number, pokemon: Pokemon, index: number, apiKey: string): void {
    const pokemonData = {
      name: pokemon.name,
      index: index + 1
    };

    this.http.post(`https://assigment2-api-production.up.railway.app/trainers/${trainerId}/pokemons`, pokemonData, {
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    }).subscribe(
      response => {
        pokemon.catched = true;
        alert("Caught!")
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
