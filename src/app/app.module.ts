import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { LandingFormComponent } from './components/landing-form/landing-form.component';
import { TrainerComponent } from './components/trainer/trainer.component';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { LandingPage } from './pages/landing/landing.page';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    LandingFormComponent,
    TrainerComponent,
    PokemonCataloguePage,
    TrainerPage,
    LandingPage

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }




