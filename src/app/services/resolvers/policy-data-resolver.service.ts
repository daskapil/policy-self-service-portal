import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { exhaustMap, map, take } from "rxjs/operators";
import { Policy } from "src/app/models/policy.model";
import { PolicyDataService, PolicyDBResponseData } from "../data/policy-data.service";
import { UserDataService } from "../data/user-data.service";

@Injectable({providedIn:'root'})
export class PolicyDataResolverService implements Resolve<Policy> {

    constructor(
        private userDataservice: UserDataService,
        private policyDataService: PolicyDataService
    ) { }
    
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Policy | Observable<Policy> | Promise<Policy> {
        return this.userDataservice.userDataSubject
            .pipe(
                take(1),
                exhaustMap(userData => {
                    return this.policyDataService
                        .getPolicy(userData.policyNumber)
                        .pipe(
                            map(policy => {return this.handlePolicyData(policy);})
                        );
                })
            );    
    }

    private handlePolicyData(resData: PolicyDBResponseData) {
        const policyData = new Policy(
            resData.accountBalance,
            resData.agentCode,
            resData.autoPay,
            resData.lastPayment,
            resData.lastPaymentDate,
            resData.nextPaymentDate,
            resData.premium,
            resData.term,
            resData.vehicle
        );
        console.log(policyData);
        this.policyDataService.policySubject.next(policyData);
        return policyData;
}
}