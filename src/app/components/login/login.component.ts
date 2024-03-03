import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthnService } from 'src/app/shared/service/authn.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isloading:boolean = false;
  messageError:string = '';


  constructor(
    private _AuthnService:AuthnService,
    private _Router:Router,
    private _FormBuilder:FormBuilder
  ){}

  // loginForm:FormGroup = new FormGroup({
  //   email: new FormControl('' , [Validators.required , Validators.email]),
  //   password: new FormControl('' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)])
  // });

  // better way

  loginForm:FormGroup = this._FormBuilder.group({
    email:['' , [Validators.required , Validators.email] ],
    password:['' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)] ]
  })

  logIn(){
    if(this.loginForm.valid && !this.isloading){
      this.isloading = true;
      this._AuthnService.SignIn(this.loginForm.value).subscribe({
        next:(response)=>{
          if(response.message == 'success'){
            // to decode token install jwt-decode
            localStorage.setItem('token',response.token);
            this._AuthnService.SaveDecodeUserData();
            this._Router.navigate(['/home']);
            this.isloading = false;
          }
        },
        error:(err)=>{
          this.messageError = err.error.message;
          this.isloading = false;
        }
      });
    }else{
      //Marks the control and all its descendant controls as touched
      this.loginForm.markAllAsTouched();
    }
  }
}
