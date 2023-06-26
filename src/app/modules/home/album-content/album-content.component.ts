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

        this.albumService.setMultimediaState([]);

        this.albumService.multimediaState.subscribe({
            next: value => this.allFiles = value
        });

        this.albumService.getAlbumContent(this.authService.getUserMail(), this.selectedAlbum.id).subscribe({
            next: value => this.albumService.setMultimediaState(value)
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

    upload($event: any) {
        let files = $event.target.files;
        if (files.length === 0) {
            return;
        }
        if (files.length > 1) {
            alert("You can upload a maximum of 1 file at once.")
            return;
        }
        const fileToUpload = files.item(0);
        if (fileToUpload.size / 1024 > 1536) {
            alert("Maximum upload file size is 1.5MB.")
            return;
        }
        const reader = new FileReader();

        reader.onload = (evt: any) => {
            const base64String = evt.target.result.split(',')[1];
            const fileInfo = {
                file: base64String,
                name: fileToUpload.name,
                size: fileToUpload.size / 1024,  // size in KB
                extension: fileToUpload.name.split('.').pop(),  // get file extension
                albumId: this.selectedAlbum.id
            };
            this.myFileService.uploadFile(fileInfo, this.authService.getUserMail()).subscribe({
                next: value => {
                    alert(value.message)
                    this.albumService.getAlbumContent(this.authService.getUserMail(), this.selectedAlbum.id)
                        .subscribe({
                            next: allFiles => this.allFiles = allFiles
                    });
                },
                error: err => alert(err.message)
            });
        };

        reader.readAsDataURL(fileToUpload);
    }

    openAlbum(i: number) {
        let album = this.subAlbums[i];
        this.albumService.getSubAlbums(album.id).subscribe({
            next: value => {
                this.albumService.setAlbumsState(value);
            }
        });
        this.albumService.getAlbumContent(this.authService.getUserMail(), album.id).subscribe({
            next: value => this.albumService.setMultimediaState(value)
        });

        this.albumService.setSelectedAlbumState(album);
        this.router.navigate(['album-content']);
    }
}
