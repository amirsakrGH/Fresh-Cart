import { HttpErrorResponse } from '@angular/common/http';
import { Component} from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthnService } from 'src/app/shared/service/authn.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  messageError:string ='';
  isloading:boolean = false;
  registerSubscripe!:Subscription

  constructor(
    private _AuthnService:AuthnService,
    private _Router:Router
    ){}


  //input --->> formControl --->> <input> -->>one property
  //inputs --->> formGroup --->> <form></form> -->>many properties

  // type FormGroup --->> Tracks the value and validity state of a group of FormControl instances.
  registerationFrom:FormGroup = new FormGroup({
    name: new FormControl('' , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]), //--->> takes initial value preferred '' not null 3lshan bt3ml error fe 7agat
    email:new FormControl('' , [Validators.required , Validators.email]), // validators class --> built in validations
    password:new FormControl('' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]),
    rePassword:new FormControl('' , [Validators.required]),
    phone:new FormControl('' , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  } , {validators:[this.confirmPassword]} as FormControlOptions);

  // dont use (click) to submit not good practice use --->> (ngSubmit)="FN()"
  handleForm() : void{
    if(this.registerationFrom.valid && !this.isloading ){
      this.isloading = true;
      this._AuthnService.SignUp(this.registerationFrom.value).subscribe({
        next:(response)=>{
          if(response.message == 'success' && this.isloading == true){
            // dynamic routing (programming routing) --->> means we can navigate from x to y using typescript not html
            // using service class -->> Router __>> Is a service that provides navigation among views and URL manipulation capabilities
            this._Router.navigate(['/login']);
            this.isloading = false;
          }
        },
        error:(err:HttpErrorResponse)=>{
          this.messageError = err.error.message
          this.isloading = false;
        }
      })
    }
  }

  confirmPassword(group:FormGroup):void {

    let password = group.get('password');
    let rePassword = group.get('rePassword');

    if(rePassword?.value == ''){
        rePassword?.setErrors({required:true});
      }else if(password?.value != rePassword?.value){
        rePassword?.setErrors({misMatch:true});
      }
    }

}







