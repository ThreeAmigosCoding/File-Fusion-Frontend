import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MultimediaMetadata} from "../../model/multimedia";

@Injectable({
  providedIn: 'root'
})
export class MyFileService {

  constructor(private http: HttpClient) { }

  helloWorld(user: string): Observable<any>{
    return this.http.get<any>("https://0dmgwjtsd5.execute-api.eu-central-1.amazonaws.com/dev/helloWorld");
  }

  uploadFile(fileInfo: any, email: string) : Observable<any> {
      return this.http.post(" https://0dmgwjtsd5.execute-api.eu-central-1.amazonaws.com/dev/uploadFile/" + email,
           fileInfo);
  }

  getAllUserFiles(email: string) : Observable<MultimediaMetadata[]>{
      return this.http.get<MultimediaMetadata[]>("https://0dmgwjtsd5.execute-api.eu-central-1.amazonaws.com" +
          "/dev/getAllUserFiles/" + email);
  }
}
