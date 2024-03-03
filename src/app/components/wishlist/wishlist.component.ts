import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/service/cart.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit , OnDestroy {

  constructor(
    private _WishlistService:WishlistService,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private spinner: NgxSpinnerService

  ){}

  WishlistServiceSubscripe:Subscription = new Subscription();
  addToCartSubscripe:Subscription = new Subscription();
  addWishListSubscripe:Subscription = new Subscription();
  removeWishListSubscripe:Subscription = new Subscription();

  productsArray:Product[]=[];

  wishListData:string[] = [];


  ngOnInit(): void {
    this.spinner.show();
    this.WishlistServiceSubscripe = this._WishlistService.getUserWishList().subscribe({
      next:(response)=>{
        // console.log(response)
        this.productsArray = response.data
        // array of object >> array of id
        const newData = response.data.map( (item:any)=> item._id );
        // console.log(newData)
        this.wishListData = newData;

        this.spinner.hide();

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  ngOnDestroy(): void {
    this.WishlistServiceSubscripe.unsubscribe();
    this.addToCartSubscripe.unsubscribe();
    this.addWishListSubscripe .unsubscribe();
    this.removeWishListSubscripe .unsubscribe();
  }

  addCart(pId:string){
    this.addToCartSubscripe = this._CartService.addToCart(pId).subscribe({
      next:(response)=>{
        this.showSuccess();
        // console.log(response)
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error:(err)=>{console.log(err)}
    })
  }


  // ---wishlist section---

  addWishList(pId:string){
    this.addWishListSubscripe = this._WishlistService.addToWishList(pId).subscribe({
      next:(response)=>{
        this.showSuccess();
        // console.log(response)
        this.wishListData = response.data;
        this._WishlistService.favNumber.next(response.data.length);
      },
      error:(err)=>{console.log(err)}
    })
  }

  removeWishList(pId:string):void{
    this.removeWishListSubscripe = this._WishlistService.removeFromWishList(pId).subscribe({
      next:(response)=>{
        this.showRemove();
        // console.log(response)
        this.wishListData = response.data;

        const newProductData = this.productsArray.filter( (item)=> this.wishListData.includes(item._id) );
        this.productsArray = newProductData;

        this._WishlistService.favNumber.next(response.data.length);
      },
      error:(err)=>{console.log(err)}
    })
  }


  showSuccess() {
    this._ToastrService.success("Product added successfully");
  }
  showRemove() {
    this._ToastrService.success("Product removed successfully");
  }

}
