import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon";
import { Observable } from "rxjs";
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class PokemonService {

    constructor(private readonly httpClient: HttpClient) {

    }

    getPokemons(): Observable<Pokemon[]> {
        return this.httpClient.get<any>('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0').pipe(
          map(response => response.results)  
        );
    }

    getPoekomonByName(name:string): Observable<Pokemon> {
        return this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .pipe(
                tap(data => console.log(`Fetched Pokemon ${name} Details:`, data))
            );
    }
}
