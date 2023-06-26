import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Album} from "../../model/album";
import {BehaviorSubject, Observable} from "rxjs";
import {domain} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

    albums: BehaviorSubject<Album[]> = new BehaviorSubject<Album[]>([]);
    albumsState = this.albums.asObservable();

    selectedAlbum: BehaviorSubject<Album> = new BehaviorSubject<Album>({
        id: "",
        deleted: false, name: "", owner: "", parent: ""});
    selectedAlbumState = this.selectedAlbum.asObservable();

    public setSelectedAlbumState(selectedAlbum: Album) {
        this.selectedAlbum.next(selectedAlbum);
    }

    public setAlbumsState(albums: Album[]): void {
        this.albums.next(albums);
    }

    constructor(private http: HttpClient) { }

    public createAlbum(album: Album, email: String): Observable<any> {
        return this.http.post<any>( domain + "createAlbum/"
        + email, album);
    }

    public getAllUserAlbums(email: string): Observable<Album[]> {
        return this.http.get<Album[]>(domain + "getAllUserAlbums/" + email);
    }

    public deleteAlbum(albumId: string) : Observable<any> {
        return this.http.delete<any>(domain + "deleteAlbum/" + albumId);
    }

    getSubAlbums(parentId: string): Observable<Album[]> {
        return this.http.get<any>(domain + "getSubAlbums/" + parentId);
    }

}
