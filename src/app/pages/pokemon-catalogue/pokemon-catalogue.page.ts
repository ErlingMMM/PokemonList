import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';


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

  catchAndSave(pokemon: Pokemon, index: number, type: string): void {
    this.pokemonService.updateTrainersPokemons(pokemon, index, type).subscribe(
      (response) => {
        pokemon.catched = true;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  updateOffsetPage(offsetChange: number): void {
    const currentOffset = parseInt(sessionStorage.getItem("offsetPage") || "0", 10);
    let newOffset = currentOffset + offsetChange;
  
    if (newOffset < 0) {
      newOffset = 0;
    } else if (newOffset > 1250) {
      newOffset = 1250;
    }
  
    sessionStorage.setItem("offsetPage", newOffset.toString());
  }
}