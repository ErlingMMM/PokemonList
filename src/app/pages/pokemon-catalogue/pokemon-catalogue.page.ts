import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon';
import { Trainer } from 'src/app/models/trainer.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { v4 as uuidv4 } from 'uuid';


const url = environment.apiUsers
const key = environment.apiKey

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
      });
  }

  catchAndSave(pokemon: Pokemon, index: number): void {
    const trainer = localStorage.getItem("trainerName");
    const data: Pokemon = {
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
      catched: false,
      index: index + 1,
      trainer: trainer || '',
    };


    // Check if trainer exists
    this.http.get<Trainer[]>(`${url}?username=${trainer}`).subscribe(
      (trainers: Trainer[]) => {
        if (trainers.length > 0) {
          // Trainer already exists, perform a PATCH request
          const existingTrainer = trainers[0];          
          existingTrainer.pokemon.push(data);


          this.http.patch(`${url}/${existingTrainer.id}`, existingTrainer, {
            headers: {
              'X-API-Key': key,
              'Content-Type': 'application/json',
            },
          }).subscribe(
            (response) => {
              pokemon.catched = true;
              alert("Catched and saved!");
            },
            (error) => {
              console.error('Error:', error);
            }
          );

        } else {
          // Trainer doesn't exist, perform a POST request to create
          const newTrainer: Trainer = {
            id: uuidv4(),
            username: trainer || "",
            pokemon: [data],
          };

          this.http.post<Trainer>(url, newTrainer, {
            headers: {
              'X-API-Key': key,
              'Content-Type': 'application/json',
            },
          }).subscribe(
            (response) => {
              pokemon.catched = true;
              alert("Catched and saved!");
            },
            (error) => {
              console.error('Error:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}