import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, pipe, Subject, BehaviorSubject } from '../../../node_modules/rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { DatePipe } from '../../../node_modules/@angular/common';

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refrehToken: string,
    expiresIn: string,
    localId: string,
    registered?: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpTimer : any;

    constructor(private http: HttpClient, private router : Router) { }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDW8Ybu4tSSVLQ3EeBIjqg949H2Ho7ZRfI',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.errorHandler), tap((resData: AuthResponseData) => {
                this.authHandler(resData.email, resData.idToken, +resData.expiresIn, resData.localId);
            }));
    }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDW8Ybu4tSSVLQ3EeBIjqg949H2Ho7ZRfI',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.errorHandler), tap((resData: AuthResponseData) => {
            this.authHandler(resData.email, resData.idToken, +resData.expiresIn, resData.localId);
        }));
    }

    autoLogin(){
        const userData : {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate : string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData) return;

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
            this.autoLogout(expirationDuration/1000); // was miliseconds already

        }
    }

    autoLogout(expirateTime : number){
       this.tokenExpTimer= setTimeout(() => {
            this.logOut();
       }, expirateTime*1000); // *1000 to receive seconds
    }

    logOut(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpTimer)
            clearTimeout(this.tokenExpTimer)

        this.tokenExpTimer = null;
    }

    private authHandler(email: string, token: string, expiresIn: number, id: string) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, id, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn)
        localStorage.setItem('userData' , JSON.stringify(user));
    }

    private errorHandler(errorRes: HttpErrorResponse) {
        let errorMessage = "An error ocurred"
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_NOT_FOUND':
                errorMessage = " There is no user record corresponding to this email";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = " The password is invalid ";
                break;
            case 'EMAIL_EXISTS':
                errorMessage = "Email already exists";
                break;
        }
        return throwError(errorMessage);
    }
}