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
  //Previous page button is grey when boolean is true
  isOnFirstPage: boolean = false;



  constructor(
    private pokemonService: PokemonService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    //sessionStorage to navigate pages
    const currentOffset = parseInt(sessionStorage.getItem("offsetPage") || "0", 10);
    this.isOnFirstPage = currentOffset === 0;
    this.getPokemonList();
  }

  getPokemonList(): void {
    const currentOffset = parseInt(sessionStorage.getItem("offsetPage") || "0", 10);
    this.pokemonService.getPokemons()
      .subscribe(pokemonList => {
        this.pokemons = pokemonList.map((pokemon, index) => ({
          ...pokemon,
          //Image selected for each Pokemon. 
          //The number of the Pokoemon in the API is selected by the index of the 50 Pokemons in the page 
          //+ the number of the offset + 1 because of 0 indexing. 
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + (1 + currentOffset)}.png`,
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

  //Updating the offset in the session storage meant for the API call every time the navigation buttons is clicked.
  updateOffsetPage(offsetChange: number): void {
    const currentOffset = parseInt(sessionStorage.getItem("offsetPage") || "0", 10);
    let newOffset = currentOffset + offsetChange;

    //Offset can never be greater than 1250 because of the total number of Pokemons. 
    if (newOffset < 0) {
      newOffset = 0;
    } else if (newOffset > 1250) {
      newOffset = 1250;
    }
    sessionStorage.setItem("offsetPage", newOffset.toString());
    this.isOnFirstPage = newOffset === 0;
    //List Pokoemons again after we set the new offset value
    this.getPokemonList();

  }
}