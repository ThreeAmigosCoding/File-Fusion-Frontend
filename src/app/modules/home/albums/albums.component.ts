import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AlbumCreationComponent} from "../album-creation/album-creation.component";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit{

    constructor(public dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    newAlbum() {
        this.dialog.open(AlbumCreationComponent);
    }
}
