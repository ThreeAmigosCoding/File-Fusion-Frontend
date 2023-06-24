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


@NgModule({
  declarations: [
    HomeComponent,
    AlbumsComponent,
    SharedWithMeComponent,
    FileOverviewComponent
  ],
    imports: [
        CommonModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        HttpClientModule
    ]
})
export class HomeModule { }
