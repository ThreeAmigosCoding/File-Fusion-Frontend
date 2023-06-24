import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import { Location } from '@angular/common';
import {MultimediaMetadata} from "../../../model/multimedia";
import {MatDialog} from "@angular/material/dialog";
import {FileOverviewComponent} from "../file-overview/file-overview.component";
import {MyFileService} from "../my-file.service";

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
           next: value => this.user = value
        });

        this.generateMultimediaMetadata();
    }

    private generateMultimediaMetadata() {
        for (let i = 0; i < 10; i++) {
            const multimedia: MultimediaMetadata = {
                id: `id${i}`,
                name: `Multimedia ${i}`,
                type: `Type ${i}`,
                size_in_kb: i * 100,
                created_at: new Date(),
                last_changed: new Date(),
                username: `User ${i}`,
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
            };

            this.allFiles.push(multimedia);
        }
    }


    openFileOverview(file: MultimediaMetadata) {
        this.fileOverviewDialog.open(FileOverviewComponent, {data: file})
    }

    upload($event: any) {
        let files = $event.target.files;
        if (files.length === 0) {
            return;
        }
        if (files.length > 10) {
            alert("You can upload a maximum of 10 files at once.")
            return;
        }
        for (let file of files) {
            alert("Handle file upload")
        }

    }
}
