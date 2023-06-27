import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MultimediaMetadata} from "../../../model/multimedia";
import {getFileName, getFileTypeString} from "../../../file-helper";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyFileService} from "../my-file.service";
import {AuthService} from "../../auth/auth.service";
import {Album} from "../../../model/album";
import {ShareComponent} from "../share/share.component";



@Component({
  selector: 'app-file-overview',
  templateUrl: './file-overview.component.html',
  styleUrls: ['./file-overview.component.css']
})
export class FileOverviewComponent implements OnInit{

    editMode: boolean = false;
    isOwner: boolean = false;
    protected readonly getFileName = getFileName;
    protected readonly getFileTypeString = getFileTypeString;
    encodedFile: string = '';
    fileSize: number = 0;
    fileExtension: string | undefined = '';
    changedFileName: string = '';
    availableAlbums: Album[] = []

    constructor(private dialogRef: MatDialogRef<FileOverviewComponent>,
                @Inject(MAT_DIALOG_DATA) public fileData: any,
                private myFileService: MyFileService, private authService: AuthService,
                public shareDialog: MatDialog) {
    }

    updateFileForm = new FormGroup({
        name: new FormControl(getFileName(this.fileData.file), Validators.required),
        description: new FormControl(this.fileData.file.description),
    });

    ngOnInit(): void {
        this.fileSize = this.fileData.file.size_in_kb;
        this.fileExtension = this.fileData.file.type;
        this.isOwner = this.fileData.isOwner;
        this.myFileService.getAvailableAlbums(this.authService.getUserMail(), this.fileData.file.id).subscribe({
            next: value => {
                this.availableAlbums = value;
            },
            error: err => alert(err.error.message)
        });
    }


    switchUpdateMode() {
        this.editMode = !this.editMode;
        this.changedFileName = ''
        this.fileSize = this.fileData.file.size_in_kb;
        this.fileExtension = this.fileData.file.type;
        this.encodedFile = '';
    }

    uploadChange($event: Event) {
        let target = $event.target as HTMLInputElement;
        let files = target.files;
        if (!files || files.length === 0) {
            return;
        }
        if (files.length > 1) {
            alert("You can upload a maximum of 1 file at once.");
            return;
        }
        const fileToUpload: File | null = files.item(0);
        if (fileToUpload && fileToUpload.size / 1024 > 1536) {
            alert("Maximum upload file size is 1.5MB.");
            return;
        }
        const reader = new FileReader();
        if (fileToUpload != null) {
            reader.onload = (evt: any) => {
                this.encodedFile = evt.target.result.split(',')[1];
                this.fileSize = fileToUpload.size / 1024;
                this.fileExtension = fileToUpload.name.split('.').pop()
                this.changedFileName = fileToUpload.name
            };

            reader.readAsDataURL(fileToUpload);
        }

    }

    save() {
        if (!this.updateFileForm.valid)
            return
        let changedFile = {
            name: this.updateFileForm.value.name + "." + this.fileExtension,
            extension: this.fileExtension,
            size: this.fileSize,
            username: this.authService.getUserMail(),
            description: this.updateFileForm.value.description,
            file: this.encodedFile
        }
        this.myFileService.updateFile(this.fileData.file.id, changedFile).subscribe({
            next: value => {
                window.location.reload();
            },
            error: err => alert(err.error.message)
        });

    }

    delete() {
        if (confirm('Are you sure you want to delete this file?')) {
            this.myFileService.deleteFile(this.fileData.file).subscribe({
                next: value => {
                    alert(value.message)
                    window.location.reload();
                },
                error: err => alert(err.error.message)
            });

        }
    }


    addToAlbum(albumIndex: number) {
        let selectedAlbum: Album = this.availableAlbums[albumIndex];
        this.myFileService.addToAlbum(selectedAlbum.id, this.fileData.file.id).subscribe({
            next: value => {
                alert(value.message)
                this.availableAlbums.splice(albumIndex, 1);
            },
            error: err => alert(err.error.message)
        });

    }

    openShareComponent() {
        let content = {
            id: this.fileData.file.id,
            type: 'file'
        }
        this.shareDialog.open(ShareComponent, {data: content})
    }
}
