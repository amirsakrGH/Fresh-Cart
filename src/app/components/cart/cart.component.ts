import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { cartInfo } from 'src/app/shared/interfaces/cart';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit , OnDestroy {
  constructor(private _CartService:CartService,
    private _ToastrService:ToastrService,
    private spinner: NgxSpinnerService
    ){}

  getUserCartSubscripe:Subscription = new Subscription();
  removeCartItemSubscripe:Subscription = new Subscription();
  updateProductQuantitySubscripe:Subscription = new Subscription();

  cartDetails:any;

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 1.5 seconds */
      this.spinner.hide();
    }, 1500);

    this.getUserCartSubscripe = this._CartService.getUserCart().subscribe({
      next:(response)=>{
        console.log('hello')
        this.cartDetails = response.data;

      },
      error:(err)=>{console.log(err)}
    });
  }

  ngOnDestroy(): void {
    this.getUserCartSubscripe.unsubscribe();
    this.removeCartItemSubscripe.unsubscribe();
    this.updateProductQuantitySubscripe.unsubscribe();
  }

  removeCartItem(myProductId:string){
    this.removeCartItemSubscripe = this._CartService.removeCartItem(myProductId).subscribe({
      next:(response)=>{
        this.cartDetails = response.data;
        this._CartService.cartNumber.next(response.numOfCartItems);
        this.showDelete();
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  updateProductQuantity(pId:string,count:number){
    if(count > 0){
      this.updateProductQuantitySubscripe = this._CartService.updateProductQuantity(pId,count).subscribe({
        next:(response)=>{
          this.cartDetails = response.data
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
  }

  clear():void{
    this._CartService.clearCartItem().subscribe({
      next:(response)=>{
        console.log(response);
        if(response.message == "success"){
          this.cartDetails = null;
          this._CartService.cartNumber.next(0);
          this.showDelete();
        }
      },
      error:(err)=>{console.log(err)}
    })
  }

  showDelete() {
    this._ToastrService.success("Product removed successfully");
  }

}
