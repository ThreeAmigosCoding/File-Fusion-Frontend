import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AlbumCreationComponent} from "../album-creation/album-creation.component";
import {AuthService} from "../../auth/auth.service";
import {AlbumService} from "../album.service";
import {Album} from "../../../model/album";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit{

    albums: Album[] = []

    constructor(public dialog: MatDialog,
                private authService: AuthService,
                private albumService: AlbumService) {
    }

    ngOnInit(): void {
        this.albumService.albumsState.subscribe({
            next: value => this.albums = value
        });


        this.albumService.getAllUserAlbums(this.authService.getUserMail()).subscribe({
            next: value => {
                this.albumService.setAlbumsState(value);
            },
            error: err => {}
        })
    }

    newAlbum() {
        this.dialog.open(AlbumCreationComponent);
    }
}
