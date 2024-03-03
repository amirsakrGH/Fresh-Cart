import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/service/cart.service';
import { ProductsService } from 'src/app/shared/service/products.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/shared/service/wishlist.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , OnDestroy{

  constructor(
    private _ProductsService:ProductsService,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _WishlistService:WishlistService,
    private spinner: NgxSpinnerService
    ){}

  searchWord:string = '';

  productsArray:Product[]=[];

  categories:any[] = [];

  wishListData:string[] = [];

  productsSubscripe:Subscription = new Subscription();
  categorySubscripe:Subscription = new Subscription();
  addToCartSubscripe:Subscription = new Subscription();
  addWishListSubscripe:Subscription = new Subscription();
  removeWishListSubscripe:Subscription = new Subscription();
  WishListSubscripe:Subscription = new Subscription();


  mainslider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:1000,
    items:1,
    nav: false
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:1000,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  ngOnInit(): void {
    this.spinner.show();
    // get all products
    this.productsSubscripe = this._ProductsService.getAllProducts().subscribe(
      {
        next:(response)=>{
          this.productsArray = response.data;
          this.spinner.hide();
        },
        error:()=>{

        }
      }
    )

    // get Categories
    this.categorySubscripe = this._ProductsService.getCategories().subscribe({
      next:(response)=>{
        console.log(response)
        this.categories = response.data;
      }
    })

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
    this.categorySubscripe.unsubscribe();
    this.addToCartSubscripe.unsubscribe();
    this.addWishListSubscripe.unsubscribe();
    this.removeWishListSubscripe.unsubscribe();
    this.WishListSubscripe.unsubscribe();
  }

  addCart(pId:string){
    this.addToCartSubscripe = this._CartService.addToCart(pId).subscribe({
      next:(response)=>{
        this.showSuccess();
        // console.log(response);
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
        console.log(response)
        this.wishListData = response.data;
        this._WishlistService.favNumber.next(response.data.length)
      },
      error:(err)=>{console.log(err)}
    })
  }

  removeWishList(pId:string):void{
    this.removeWishListSubscripe = this._WishlistService.removeFromWishList(pId).subscribe({
      next:(response)=>{
        this.showRemove();
        this.wishListData = response.data;
        this._WishlistService.favNumber.next(response.data.length);
        console.log('wishlist length',response.data.length)
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
