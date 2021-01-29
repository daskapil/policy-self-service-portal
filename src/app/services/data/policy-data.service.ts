import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { Policy } from "src/app/models/policy.model";
import { environment } from "src/environments/environment";

export interface PolicyDBResponseData{
    accountBalance: string,
    agentCode: string,
    autoPay: boolean,
    lastPayment: string,
    lastPaymentDate: string,
    nextPaymentDate: string,
    premium: string,
    term: string,
    vehicle: string,
    policyNumber?:string
}

@Injectable({ providedIn: 'root' })
export class PolicyDataService {
    policies: Policy[] = [];
    policiesSubject = new Subject<Policy[]>();
    policySubject = new Subject<Policy>();
    private dbApiUrl = environment.DATABASE_API_URL;;
    
    constructor(private http: HttpClient) { }
    

    getPolicy(policyNumber: string) {
        return this.http
            .get<PolicyDBResponseData>(`${this.dbApiUrl}/policies/${policyNumber}.json`);    
    }

    getPolicies(agentCode: string) {
        return this.http
            .get<PolicyDBResponseData[]>(`${this.dbApiUrl}/policies.json`);
            // .pipe(
                
            //     map(policies => {
            //         const policyArr: Policy[] = [];
            //         for (const key in policies) {
            //             if (policies.hasOwnProperty(key)) {
            //                 policyArr.push({ ...policies[key], policyNumber: key });
            //             }
            //         }
            //         return policyArr.filter(policy => policy.agentCode === agentCode);
            //     }),
            //     tap(policy => console.log(policy))
            // );
                
               
    }

    

}