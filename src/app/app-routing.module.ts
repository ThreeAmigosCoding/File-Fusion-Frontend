import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./modules/home/home/home.component";
import {AlbumsComponent} from "./modules/home/albums/albums.component";
import {SharedWithMeComponent} from "./modules/home/shared-with-me/shared-with-me.component";

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'albums', component: AlbumsComponent},
    {path: 'shared-with-me', component: SharedWithMeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
