import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MyFileService {

  constructor(private http: HttpClient) { }

  helloWorld(user: string): Observable<any>{
    return this.http.get<any>("https://0dmgwjtsd5.execute-api.eu-central-1.amazonaws.com/dev/helloWorld");
  }
}
