import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {MultimediaMetadata} from "../../../model/multimedia";
import {MatDialog} from "@angular/material/dialog";
import {FileOverviewComponent} from "../file-overview/file-overview.component";
import {MyFileService} from "../my-file.service";
import {getFileName, getFilePreviewImageSource} from "../../../file-helper";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

    user: string = "";
    allFiles: MultimediaMetadata[] = [];

    constructor(private authService: AuthService, public fileOverviewDialog: MatDialog,
                private myFileService: MyFileService) {
    }

    ngOnInit() {
        this.authService.userLoggedState$.subscribe({
           next: value => {
               this.user = value;
               this.myFileService.getAllUserFiles(this.user).subscribe({
                  next: allFiles => this.allFiles = allFiles
               });
           }
        });
    }


    openFileOverview(file: MultimediaMetadata) {
        let fileData = {
            file: file,
            isOwner: true
        }
        this.fileOverviewDialog.open(FileOverviewComponent, {data: fileData})
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
                albumId: ""
            };
            this.myFileService.uploadFile(fileInfo, this.authService.getUserMail()).subscribe({
                next: value => {
                    alert(value.message)
                    this.myFileService.getAllUserFiles(this.user).subscribe({
                        next: allFiles => this.allFiles = allFiles
                    });
                },
                error: err => alert(err.message)
            });
        };

        reader.readAsDataURL(fileToUpload);
    }

    protected readonly getFileName = getFileName;
    protected readonly getFilePreviewImageSource = getFilePreviewImageSource;
}
