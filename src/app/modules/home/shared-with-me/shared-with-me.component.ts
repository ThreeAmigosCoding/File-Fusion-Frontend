import {Component, OnInit} from '@angular/core';
import {Album} from "../../../model/album";
import {ShareService} from "../share.service";
import {AuthService} from "../../auth/auth.service";
import {MultimediaMetadata} from "../../../model/multimedia";
import {getFileName, getFilePreviewImageSource} from "../../../file-helper";
import {FileOverviewComponent} from "../file-overview/file-overview.component";
import {MatDialog} from "@angular/material/dialog";
import {AlbumService} from "../album.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shared-with-me',
  templateUrl: './shared-with-me.component.html',
  styleUrls: ['./shared-with-me.component.css']
})
export class SharedWithMeComponent implements OnInit{
    albums: Album[] = [];
    files: MultimediaMetadata[] = [];
    protected readonly getFilePreviewImageSource = getFilePreviewImageSource;
    protected readonly getFileName = getFileName;

    constructor(private authService: AuthService, private shareService: ShareService,
                public fileOverviewDialog: MatDialog, private albumService: AlbumService, private router: Router) {

    }

    ngOnInit() {
        this.shareService.getSharedAlbums(this.authService.getUserMail())
            .subscribe({
                next: value => {
                    this.albums = value
                },
                error: err => alert(err.error.message)
            });

        this.shareService.getSharedFiles(this.authService.getUserMail())
            .subscribe({
                next: value => {
                    this.files = value
                },
                error: err => alert(err.error.message)
            });
    }

    openAlbum(i: number) {
        let album = this.albums[i];
        this.albumService.setSelectedAlbumState(album);
        this.router.navigate(['album-content']);
    }

    openFileOverview(file: MultimediaMetadata) {
        let fileData = {
            file: file,
            isOwner: false
        }
        this.fileOverviewDialog.open(FileOverviewComponent, {data: fileData})
    }
}
