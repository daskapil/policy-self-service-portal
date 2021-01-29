import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { exhaustMap, map, take } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { UserDataService, UserDBResponseData } from "../data/user-data.service";

@Injectable({providedIn:'root'})
export class UserDataResolverService implements Resolve<UserDBResponseData> {

    constructor(
        private userDataservice: UserDataService,
        private authService: AuthService
    ) { }
    
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): UserDBResponseData | Observable<UserDBResponseData> | Promise<UserDBResponseData> {
        return this.userDataservice.getUserData();    
    }

}