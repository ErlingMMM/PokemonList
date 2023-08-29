import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class PokemonService {

    constructor(private readonly httpClient: HttpClient) {

    }

    getPokemons(): Observable<Pokemon[]> {
        return this.httpClient.get<Pokemon[]>('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0')

    }

    getPoekomonByName(name:string): Observable<Pokemon> {
        return this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`)

    }


}