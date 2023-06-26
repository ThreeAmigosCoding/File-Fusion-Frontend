import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AlbumCreationComponent} from "../album-creation/album-creation.component";
import {AuthService} from "../../auth/auth.service";
import {AlbumService} from "../album.service";
import {Album} from "../../../model/album";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit{

    albums: Album[] = []

    constructor(public dialog: MatDialog,
                private authService: AuthService,
                private albumService: AlbumService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.albumService.setAlbumsState([]);

        this.albumService.getAllUserAlbums(this.authService.getUserMail()).subscribe({
            next: value => {
                this.albumService.setAlbumsState(value);
            },
            error: err => {}
        });

        this.albumService.albumsState.subscribe({
            next: value => this.albums = value
        });
    }

    newAlbum() {
        this.dialog.open(AlbumCreationComponent, {data: ""});
    }

    openAlbum(index: number) {
        let album = this.albums[index];
        this.router.navigate(['album-content']);
        this.albumService.setSelectedAlbumState(album);
    }
}
