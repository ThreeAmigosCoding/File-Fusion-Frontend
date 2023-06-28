import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MultimediaMetadata} from "../../model/multimedia";
import {domain} from "../../environment";
import {Album} from "../../model/album";

@Injectable({
  providedIn: 'root'
})
export class MyFileService {

  constructor(private http: HttpClient) { }

  helloWorld(user: string): Observable<any>{
    return this.http.get<any>(domain + "helloWorld");
  }

  uploadFile(fileInfo: any, email: string) : Observable<any> {
      return this.http.post(domain + "uploadFile/" + email, fileInfo);
  }

  getAllUserFiles(email: string) : Observable<MultimediaMetadata[]>{
      return this.http.get<MultimediaMetadata[]>(domain + "getAllUserFiles/" + email);
  }

  updateFile(id: string, changedFile: any): Observable<any>{
      return  this.http.put<any>(domain + "updateFile/" + id, changedFile)
  }

  deleteFile(file: MultimediaMetadata): Observable<any> {
      return this.http.delete<any>(domain + "delete_file/" + file.id);
  }

  getAvailableAlbums(email: string, id: string): Observable<Album[]> {
      return this.http.get<Album[]>(domain + "getAvailableAlbums/" + email + "/" + id);
  }

  addToAlbum(albumId: string, fileId: string): Observable<any> {
      return this.http.get<any>(domain + "addToAlbum/" + albumId + "/" + fileId);
  }
}
