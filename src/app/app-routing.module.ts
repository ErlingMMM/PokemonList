import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './pages/landing/landing.page';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';

const routes: Routes = [
  {
    path: "",
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'login', component: LandingPage
  },
  {
    path: 'trainere', component: TrainerPage
  },
  {
    path: 'pokemons', component: PokemonCataloguePage
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



