import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/service/cart.service';
import { ProductsService } from 'src/app/shared/service/products.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit , OnDestroy {

  constructor(
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _ProductsService:ProductsService,
    private _WishlistService:WishlistService,
    private spinner: NgxSpinnerService
  ){}

  searchWord:string = '';
  // pagintaion init
  pageSize:number = 0;
  myCurrentPage:number = 1;
  totalProducts:number = 0;

  productsArray:Product[]=[];

  wishListData:string[] = [];


  productsSubscripe:Subscription = new Subscription();
  addToCartSubscripe:Subscription = new Subscription();

  addWishListSubscripe:Subscription = new Subscription();
  removeWishListSubscripe:Subscription = new Subscription();
  WishListSubscripe:Subscription = new Subscription();

  ngOnInit(): void {

    this.spinner.show();
    // get all products
    this.productsSubscripe = this._ProductsService.getAllProducts().subscribe(
      {
        next:(response)=>{
          this.productsArray = response.data;
          this.pageSize = response.metadata.limit;
          this.myCurrentPage = response.metadata.currentPage;
          this.totalProducts = response.results;
          this.spinner.hide();
        },
        error:()=>{

        }
      }
    );

    // get wishlist
    this.WishListSubscripe = this._WishlistService.getUserWishList().subscribe({
      next:(response)=>{
        // console.log(response)
        // array of object >> array of id
        const newData = response.data.map( (item:any)=> item._id );
        // console.log(newData)
        this.wishListData = newData;
      },
      error:(err)=>{console.log(err)}
    })
  }

  ngOnDestroy(): void {
    this.productsSubscripe.unsubscribe();
    this.addToCartSubscripe.unsubscribe();
    this.addWishListSubscripe.unsubscribe();
    this.removeWishListSubscripe.unsubscribe();
    this.WishListSubscripe.unsubscribe();
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

    // ---- WishList Section ----

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

  pageChanged(event:any){
    // get all products
    this.productsSubscripe = this._ProductsService.getAllProducts(event).subscribe(
      {
        next:(response)=>{
          this.productsArray = response.data;
          this.pageSize = response.metadata.limit;
          this.myCurrentPage = response.metadata.currentPage;
          this.totalProducts = response.results;
        },
        error:()=>{

        }
      }
    )
  }

}
