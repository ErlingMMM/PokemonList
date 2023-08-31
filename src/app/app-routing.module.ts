import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './pages/landing/landing.page';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { AuthGuard } from './guards/auth.guard'
//Defining routes 
const routes: Routes = [
  {
    path: "",
    pathMatch: 'full',
    //Redirecting to loginPage
    redirectTo: '/login'
  },
  {
    path: 'login', component: LandingPage
  },
  {
    path: 'trainere', component: TrainerPage, canActivate: [AuthGuard]
  },
  {
    //Redirecting to loginPage
    path: 'pokemons', component: PokemonCataloguePage, canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



