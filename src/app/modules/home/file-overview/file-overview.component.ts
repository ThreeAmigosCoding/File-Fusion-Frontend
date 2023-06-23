import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MultimediaMetadata} from "../../../model/multimedia";

@Component({
  selector: 'app-file-overview',
  templateUrl: './file-overview.component.html',
  styleUrls: ['./file-overview.component.css']
})
export class FileOverviewComponent implements OnInit{

    constructor(private dialogRef: MatDialogRef<FileOverviewComponent>,
                @Inject(MAT_DIALOG_DATA) public file: MultimediaMetadata) {
    }

    ngOnInit(): void {
    }

    update() {

    }

    delete() {

    }
}
