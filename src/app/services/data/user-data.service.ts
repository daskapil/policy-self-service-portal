import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { UserData } from "src/app/models/user-data.model";
import { User } from "src/app/models/user.model";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";

export interface UserDBResponseData {
    firstName: string,
    lastName: string,
    fullName: string,
    role: string,
    accountNumber: string,
    policyNumber?: string
}

@Injectable({providedIn: 'root'})
export class UserDataService {
    private dbApiUrl = environment.DATABASE_API_URL;;
    private authdata: User;
      
    userDataSubject = new BehaviorSubject<UserData>(null);

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) { }

    getUserData() { 
        this.authdata = this.authService.user.getValue();
        console.log(this.authdata);
        console.log(`${this.dbApiUrl}/users/${this.authdata.id}.json`);

        // if (this.userDataSubject) {
        //     return userDataSubject;
        // }

        return this.http
            .get<UserDBResponseData>(`${this.dbApiUrl}/users/${this.authdata.id}.json`)
            .pipe(
                tap(resData => this.handleUserDetails(resData))
                // catchError(async (error) => console.log(error))
            );
    }

    private handleUserDetails(resData: UserDBResponseData) {
        const userData = new UserData(
            resData.firstName,
            resData.lastName,
            resData.fullName,
            resData.role,
            resData.accountNumber,
            resData.policyNumber
        );
        this.userDataSubject.next(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    public onAutoLogin() {
        const userData: {
            firstName: string,
            lastName: string,
            fullName: string,
            role: string,
            accountNumber: string,
            policyNumber: string,
        } = JSON.parse(localStorage.getItem('userData'));
     
        if (!userData)  {
            return;
        }
        const loadedUserData = new UserData(
            userData.firstName,
            userData.lastName,
            userData.fullName,
            userData.role,
            userData.accountNumber,
            userData.policyNumber
        );
        
        this.userDataSubject.next(loadedUserData);      
    }
    
}