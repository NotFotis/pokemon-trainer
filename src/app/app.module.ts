import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { ProfilePage } from './pages/profile/profile.page';
import { LoginFormComponent } from './components/login-form/login-form.component';

//Decorator
@NgModule({
  declarations: [ //Components
    AppComponent,
    LoginPage,
    PokemonCataloguePage,
    ProfilePage,
    LoginFormComponent
  ],
  imports: [ //Modules
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
