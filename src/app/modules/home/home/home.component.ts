import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import { Location } from '@angular/common';
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

        // this.generateMultimediaMetadata();
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
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.`,
                data_url: "https://multimedia-cloud-storage.s3.amazonaws.com/threeamigoscoding%40gmail.com/Logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIASBHDTYURRHGQNWIO%2F20230625%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230625T125713Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJGMEQCIFrxthhB4t%2Fx5gRIxgow0GHpZUp7QsAsK%2B6WMbz6nk7uAiA57psMtep4ypzvtuanArcS%2FzJFaxMxfKR7MGlI7rh1BSqmAwguEAAaDDE0MDA2Mzc4NjI3NSIMTGWYMECr3MCJ539vKoMDfleoda7kaJJl%2FrcA6D%2FZNMdCHBuK6ak2klgyCOxsHbOyGtTiGm1xBCdDEFcWzdY4gXUcb2wsSvi4bX6byg2HFHMJ2jcMYvIIM5iE4N8mXzeVtNn%2BnXtWh9cI4d3Bf6ZRJnJlHhRc289jLAho0WXXXdOHWGojYLkksV9yOubUJ%2B%2BBbepQ6MHVc38md67QNFsrbfY%2B5QVWWHA0DF9jRprBQG87rfbzCp2VxIUGH4dCmuhoUI10rD1TNsDatwb3WRJwXQmZygXDW7Yb4Yv22f3vZzWzoLm1OBVJeeiOskiu8Y3sh%2FF4B%2F2mfQ7WA2SbjOij7kPxbclwQ8cm5NKc9fCUD14%2FNvSBe7EfqL4r91fudRKpp%2BIC2hJP%2BTogMP%2BlyDfoVz9l8GdQRmmQX0VmD9LuyjJvOa5vZ4PfxGdyJmNiynysxCShhfVjwBZ6HA3Ec3MjPrGx2DiJcPqX8XR3TSbUA%2FA3ueJyGUeJfMsaMzz%2BcxCV%2F4fHJeCGj9dh2nT6%2FEoVHqotMKjz4KQGOp4BkcGq5JHyEmGqG64jkYGrWEGZKLXWUZEZtP05Cl%2B%2FdWr07rO%2BjuMYrj%2BdgXqJUlu5Lwoax8AUO%2F1%2F1qg9ihfc3UHBW5TLmHEz70YE%2BfL5A1M8yCsQCq5shgcab0FfYwfEdk7075D6tBayYJwO9KX%2FU%2BtLy%2Bfnh4NnnNGgsFNb8Lilu9Gb%2FUj5DxWEuuTaOg5yOQBOVFLuLKLPU92Befc%3D&X-Amz-Signature=197847c75163beaef9f5c463d301e286d64e6c14afe47421282e7fbb503fae84"
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
                extension: fileToUpload.name.split('.').pop()  // get file extension
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
