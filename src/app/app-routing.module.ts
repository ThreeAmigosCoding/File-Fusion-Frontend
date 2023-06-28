import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./modules/home/home/home.component";
import {AlbumsComponent} from "./modules/home/albums/albums.component";
import {SharedWithMeComponent} from "./modules/home/shared-with-me/shared-with-me.component";
import {AlbumContentComponent} from "./modules/home/album-content/album-content.component";
import {MemberRegistrationComponent} from "./modules/home/member-registration/member-registration.component";

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'albums', component: AlbumsComponent},
    {path: 'shared-with-me', component: SharedWithMeComponent},
    {path: 'album-content', component: AlbumContentComponent},
    {path: 'member-registration/:inviterMail/:recipient', component: MemberRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
