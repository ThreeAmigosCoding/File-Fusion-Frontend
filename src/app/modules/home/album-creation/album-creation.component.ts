import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../auth/auth.service";
import {AlbumService} from "../album.service";
import {Album} from "../../../model/album";

@Component({
  selector: 'app-album-creation',
  templateUrl: './album-creation.component.html',
  styleUrls: ['./album-creation.component.css']
})
export class AlbumCreationComponent implements OnInit{

    albumForm = new FormGroup({
        albumName: new FormControl("", [
            Validators.required,
            Validators.min(3),
            Validators.max(50),
            Validators.pattern('^[a-zA-Z0-9\-()_]+$')
        ])
    })

    constructor(public dialogRef: MatDialogRef<AlbumCreationComponent>,
                private authService: AuthService,
                private albumService: AlbumService) {
    }

    ngOnInit(): void {
    }

    createAlbum() {
        if (!this.albumForm.valid) return;

        let album: Album = {
            name: String(this.albumForm.value.albumName),
            owner: this.authService.getUserMail(),
            deleted: false,
            parent: ""
        }

        this.albumService.createAlbum(album, this.authService.getUserMail()).subscribe({
            next: value => {
                alert(value.message);
                this.dialogRef.close();
            }, error: err => alert(err.error.message)
        })
    }
}
