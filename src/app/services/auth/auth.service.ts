import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "src/app/models/user.model";

export interface AuthResponseData { 
    email: string;
    expiresIn: string;
    idToken: string;
    kind: string;
    localId: string;
    refreshToken: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private API_KEY: string = environment.FIREBASE_API_KEY;
    private login_api_url: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`; 
    private tokenExpirationTimer: any = null;

    user = new BehaviorSubject<User>(null);
    
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }
    
    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(this.login_api_url,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            )
            .pipe(
                catchError(this.handleError),
                tap(resData => this.handleAuthentication(resData))      
            );
    }

    autoLogin() {
        const authData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('authData'));

        if (!authData) {
            return;
        }

        const loadedUser = new User(
            authData.email,
            authData.id,
            authData._token,
            new Date(authData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(authData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['./login']);
        localStorage.removeItem('authData');
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(resData: AuthResponseData) {
        const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
        );

        const user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
        );

        this.user.next(user);
        this.autoLogout(+resData.expiresIn * 1000);
        localStorage.setItem('authData', JSON.stringify(user));
    }
    
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = `An unknown error occurred!`;

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {
            case (`EMAIL_EXISTS`):
                errorMessage = `The email address is already in use by another account.`;
                break;
            case (`EMAIL_NOT_FOUND`):
                errorMessage = `This email does not exist.`;
                break;
            case (`INVALID_PASSWORD`):
                errorMessage = `This password is not correct.`;
                break;
        }
        
        return throwError(errorMessage);
    }
}