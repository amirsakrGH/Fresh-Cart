import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotpasswordService } from 'src/app/shared/service/forgotpassword.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {

  constructor(
    private _ForgotpasswordService:ForgotpasswordService,
    private _Router:Router
  ){}

  step1:boolean = true;
  step2:boolean = false;
  step3:boolean = false;

  userMessage:string = '';
  sharedEmail:string = '';


  forgotForm:FormGroup = new FormGroup({
    email:new FormControl('',[Validators.email])
  })

  resetCodeForm:FormGroup = new FormGroup({
    resetCode:new FormControl('')
  })

  resetPasswordForm:FormGroup = new FormGroup({
    newPassword:new FormControl('',Validators.pattern(/^\[A-Z][a-z0-9]{6,10}$/)),
  })

  forgotPassword():void{
    let userEmail = this.forgotForm.value;
    this.sharedEmail = userEmail.email;
    this._ForgotpasswordService.forgotPass(userEmail).subscribe({
      next:(response)=>{
          this.userMessage = response.message;
          this.step1 = false;
          this.step2 = true;
      },
      error:(err)=>{
        this.userMessage = err.error.message;
      }
    })
  }

  resetCode():void{
    let resetcode = this.resetCodeForm.value
    this._ForgotpasswordService.resetCode(resetcode).subscribe({
      next:(response)=>{
        this.userMessage = response.status;
        this.step2 = false;
        this.step3 = true;
      },
      error:(err)=>{
        this.userMessage = err.error.message;
      }
    })
  }

  newPassword():void{
    let resetForm = this.resetPasswordForm.value;
    resetForm.email = this.sharedEmail;
    this._ForgotpasswordService.resetPassword(resetForm).subscribe({
      next:(response)=>{
        if(response.token){
          localStorage.setItem('token',response.token);
          this._Router.navigate(['/home']);
        }
      },
      error:(err)=>{
        this.userMessage = err.error.message;
      }
    })
  }


}
