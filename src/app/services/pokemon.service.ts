import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon";
import { Trainer } from "../models/trainer.model";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environment/environment';
import { v4 as uuidv4 } from 'uuid';
import { switchMap } from "rxjs/operators";

// URL and API key from the environment config
const url = environment.apiUsers
const key = environment.apiKey



@Injectable({ providedIn: "root" })
export class PokemonService {

    constructor(private readonly httpClient: HttpClient) { }

    //A list of Pokemon from the PokeAPI
    getPokemons(): Observable<Pokemon[]> {
        const currentOffset = parseInt(sessionStorage.getItem("offsetPage") || "0", 10);
        return this.httpClient.get<any>(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${currentOffset}`).pipe(
            map(response => response.results)
        );
    }

    // Fetch the trainer data from a different API
    getTrainerPokemons(): Observable<Trainer[]> {
        //Get the trainers username from localStorage
        const trainer = localStorage.getItem("trainerName");

        //GET request
        return this.httpClient.get<any>('https://assigment2-api-production.up.railway.app/trainers').pipe(
            //Filter by username
            map(response => response.filter((obj: Trainer) => obj.username === trainer)),
            catchError(error => {
                console.error("Error fetching data:", error);
                return of([]); // If there is no pokemons saved for the given trainer, return empty array
            })
        );
    }


    updateTrainersPokemons(pokemon: Pokemon, index: number, type: string): Observable<any> {
        const trainer = localStorage.getItem("trainerName");
        const currentOffset = parseInt(sessionStorage.getItem("offsetPage") || "0", 10);
        //Create a object for the selected Pokemon
        const data: Pokemon = {
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + (1 + currentOffset)}.png`,
            catched: false,
            index: index + (1 + currentOffset),
            trainer: trainer || ''
        };
        //GET trainer from the API if it exists in the API. If not, add the trainer to the API
        return this.httpClient.get<Trainer[]>(`${url}?username=${trainer}`).pipe(
            switchMap((trainers: Trainer[]) => {
                if (trainers.length > 0) {
                    const existingTrainer = trainers[0];
                    //Sending a parameter called "type" from the HTML code. When the type is "save", Pokemon is saved to the trainer page. 
                    //Else, the Pokemon is deleted from the trainer page. 
                    if (type === "save") {
                        existingTrainer.pokemon.push(data);
                    } else {
                        existingTrainer.pokemon.splice(index, 1)
                    }
                    //Patching existing array of objects for the trainer logged in. 
                    return this.httpClient.patch(`${url}/${existingTrainer.id}`, existingTrainer, {
                        headers: {
                            'X-API-Key': key,
                            'Content-Type': 'application/json'
                        }
                    });
                } else {
                    const newTrainer: Trainer = {
                        id: uuidv4(),
                        username: trainer || "",
                        pokemon: [data]
                    };
                    return this.httpClient.post<Trainer>(url, newTrainer, {
                        headers: {
                            'X-API-Key': key,
                            'Content-Type': 'application/json'
                        }
                    });
                }
            })
        );
    }
}
