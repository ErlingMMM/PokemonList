import { Pokemon } from "./pokemon";

export  interface Trainer{
    id: string;
    username:string;
    pokemon: Pokemon[];
}