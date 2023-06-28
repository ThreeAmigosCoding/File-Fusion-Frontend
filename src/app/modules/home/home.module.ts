import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AlbumsComponent } from './albums/albums.component';
import { SharedWithMeComponent } from './shared-with-me/shared-with-me.component';
import { MatIconModule} from "@angular/material/icon";
import { FileOverviewComponent } from './file-overview/file-overview.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";

import { AlbumCreationComponent } from './album-creation/album-creation.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";

import {MatInputModule} from "@angular/material/input";
import {SafePipe} from "./file-overview/safe-pipe";
import { AlbumContentComponent } from './album-content/album-content.component';
import { ShareComponent } from './share/share.component';
import { MemberInviteComponent } from './member-invite/member-invite.component';
import { MemberRegistrationComponent } from './member-registration/member-registration.component';


@NgModule({
  declarations: [
    HomeComponent,
    AlbumsComponent,
    SharedWithMeComponent,
    FileOverviewComponent,
    AlbumCreationComponent,
    SafePipe,
    AlbumContentComponent,
    ShareComponent,
    MemberInviteComponent,
    MemberRegistrationComponent
  ],
    imports: [
        CommonModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        HttpClientModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule
    ],

    providers: [SafePipe]

})
export class HomeModule { }
