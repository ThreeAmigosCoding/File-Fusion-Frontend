import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {domain} from "../../environment";
import {FamilyMember} from "../../model/family-member";

@Injectable({
  providedIn: 'root'
})
export class FamilyMemberService {

    constructor(private http: HttpClient) { }

    manageRequest(request_id: string, action: string): Observable<any>{
        return this.http.post<any>(domain + "manageRegistrationRequest/"+ request_id +
            "/" + action, {});
    }

    inviteMember(member: string, inviter: string): Observable<any>{
        return this.http.get<any>(domain + "sendInvite/" + inviter + "/" + member);
    }

    createRequest(member: any, inviter: string): Observable<any>{
        return this.http.post<any>(domain + "createRegistrationRequest/" + inviter +
            "/" + member.email, member);
    }

    getAllMembers(inviter: string, invitationStatus: string): Observable<FamilyMember[]>{
        return this.http.get<FamilyMember[]>(domain+ "getMembersByStatus/" + inviter + "/" + invitationStatus);
    }
}
