import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Album} from "../../model/album";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

    albums: BehaviorSubject<Album[]> = new BehaviorSubject<Album[]>([]);
    albumsState = this.albums.asObservable();

    public setAlbumsState(albums: Album[]): void {
        this.albums.next(albums);
    }

    constructor(private http: HttpClient) { }

    public createAlbum(album: Album, email: String): Observable<any> {
        return this.http.post<any>("https://0dmgwjtsd5.execute-api.eu-central-1.amazonaws.com/dev/createAlbum/"
        + email, album);
    }

    public getAllUserAlbums(email: string): Observable<Album[]> {
        return this.http.get<Album[]>("https://0dmgwjtsd5.execute-api.eu-central-1.amazonaws.com/dev/getAllUserAlbums/"
        + email);
    }

}
