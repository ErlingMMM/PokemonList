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

  trainerPokemons: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getPokemonTrainerList();
  }

  getPokemonTrainerList(): void {
    this.pokemonService.getTrainerPokemons()
      .subscribe(trainerList => {
        if (trainerList.length > 0) {
          this.trainerPokemons = trainerList[0].pokemon;
        } else {
          console.error('Trainer list is empty.');
        }
      });
  }

  releasePokemon(pokemon: Pokemon, index: number, type: string): void {
    this.pokemonService.updateTrainersPokemons(pokemon, index, type).subscribe(
      (response) => {
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}