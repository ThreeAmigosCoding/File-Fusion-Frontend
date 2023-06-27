import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {domain} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private http: HttpClient) { }

  share(userEmail: string, contentId: string, contentType: string, emails: string[]): Observable<any> {
      let shareInfo = {
          userEmail: userEmail,
          contentId: contentId,
          contentType: contentType,
          emails: emails
      }
      return this.http.post(domain + "shareWithUser", shareInfo)
  }

  getSharedUsers(ownerEmail: string, contentId: string): Observable<string[]> {
      return this.http.get<string[]>(domain + "getSharedUsers/" + ownerEmail + "/" + contentId);
  }

  removeSharePermissions(ownerEmail: string, viewerEmail: string, contentId: string): Observable<any> {
      return this.http.delete(domain + "removeSharePermissions/" + ownerEmail + "/" + viewerEmail + "/" + contentId)
  }

}
