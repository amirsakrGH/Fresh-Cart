import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy{

  constructor(
    private _FormBuilder:FormBuilder,
    private _ActivatedRoute:ActivatedRoute,
    private _CartService:CartService
  ){}



  cartId:any;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        // console.log(param.get('cId'));
        this.cartId = param.get('cId')
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  checkout:FormGroup = this._FormBuilder.group({
    details: [''],
    phone: [''],
    city: ['']
  });

  payment():void{
    this._CartService.checkout(this.cartId,this.checkout.value).subscribe({
      next:(response)=>{
        if(response.status == "success"){
          window.open(response.session.url, '_self');
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
