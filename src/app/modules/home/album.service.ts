import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Album} from "../../model/album";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

    constructor(private http: HttpClient) { }

    public createAlbum(album: Album, email: String): Observable<any> {
        return this.http.post<any>("https://0dmgwjtsd5.execute-api.eu-central-1.amazonaws.com/dev/createAlbum/"
        + email, album);
    }

}
