import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnasayfaComponent} from 'src/app/components/anasayfa/anasayfa.component';
import {FavorilerimComponent} from 'src/app/components/favorilerim/favorilerim.component';

const routes: Routes = [
  {path: '', redirectTo: '/Anasayfa', pathMatch: 'full'} ,
  {path: 'Anasayfa' , component: AnasayfaComponent},
  {path: 'favorilerim' , component: FavorilerimComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
