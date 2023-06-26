import {Component, OnInit} from '@angular/core';
import {getFileName, getFilePreviewImageSource} from "../../../file-helper";
import {Album} from "../../../model/album";
import {MultimediaMetadata} from "../../../model/multimedia";
import {AuthService} from "../../auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {MyFileService} from "../my-file.service";
import {AlbumService} from "../album.service";
import {Router} from "@angular/router";
import {AlbumCreationComponent} from "../album-creation/album-creation.component";

@Component({
  selector: 'app-album-content',
  templateUrl: './album-content.component.html',
  styleUrls: ['./album-content.component.css']
})
export class AlbumContentComponent implements OnInit{

    selectedAlbum: Album = {
        id: "",
        deleted: false,
        name: "",
        owner: "",
        parent: ""

    }
    subAlbums: Album[] = [];
    allFiles: MultimediaMetadata[] = [];

    constructor(private authService: AuthService,
                public dialog: MatDialog,
                private myFileService: MyFileService,
                private albumService: AlbumService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.albumService.setAlbumsState([]);
        this.albumService.selectedAlbumState.subscribe({
            next: value => this.selectedAlbum = value
        });

        this.albumService.albumsState.subscribe({
            next: value => this.subAlbums = value
        });

        this.albumService.getSubAlbums(this.selectedAlbum.id).subscribe({
            next: value => {
                this.albumService.setAlbumsState(value);
                console.log(value)
            }
        });
    }

    newAlbum() {
        this.dialog.open(AlbumCreationComponent, {data: this.selectedAlbum.id});
    }

    protected readonly getFileName = getFileName;
    protected readonly getFilePreviewImageSource = getFilePreviewImageSource;

    openFileOverview(file: any) {

    }

    deleteAlbum() {
        if (!confirm('Are you sure you want to delete this album?')) return

        this.albumService.deleteAlbum(this.selectedAlbum.id).subscribe({
            next: value => {
                alert(value.message);
                this.router.navigate(["albums"]);
            }, error: err => alert(err.error.message)
        })
    }

    upload($event: Event) {

    }

    openAlbum(i: number) {
        let album = this.subAlbums[i];
        this.albumService.setSelectedAlbumState(album);
        this.router.navigate(['album-content']);
    }
}
