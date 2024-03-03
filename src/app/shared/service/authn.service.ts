import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthnService {

  decodeToken:any;

  userNameDisplay = new BehaviorSubject('');


  constructor(
    private _HttpClient:HttpClient,
    private _Router:Router
    ) {
      this.SaveDecodeUserData();
    }

  SaveDecodeUserData(){
    if(localStorage.getItem('token') !== null){
      let encodedToken:any = localStorage.getItem('token');
      // because jwtDecode(encodedToken) take string maybe encodedToken equal null so we have assign it to any --> encodedToken:any
      this.decodeToken = jwtDecode(encodedToken);
      this.userNameDisplay.next(this.decodeToken.name)
    }
  }

  SignUp(userData:object) : Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',userData)
  }

  SignIn(userData:object) : Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',userData)
  }

  SignOut():void{
    this.userNameDisplay.next('');
    localStorage.removeItem('token');
    this._Router.navigate(['/login'])
  }
}
