import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/service/cart.service';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(
    private _ProductsService:ProductsService,
    private _ActivatedRoute:ActivatedRoute,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private spinner: NgxSpinnerService
    ){}

  addToCartSubscripe:Subscription = new Subscription();

  productDetails:Product = {} as Product;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:1000,
    navText: ['', ''],
    items:1,
    nav: false
  }


  ngOnInit(): void {
    this.spinner.show();
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        let productId:any = param.get('pId');
        this._ProductsService.getProductDetails(productId).subscribe({
          next:(product)=>{
            this.productDetails = product.data;
          this.spinner.hide();
          },
          error:()=>{}
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.addToCartSubscripe.unsubscribe();
  }

  addToCart(pId:string){
    this.addToCartSubscripe = this._CartService.addToCart(pId).subscribe({
      next:(response)=>{
        this.showSuccess();
        this._CartService.cartNumber.next(response.numOfCartItems);
        console.log(response)
      },
      error:(err)=>{console.log(err)}
    })
  }

  showSuccess() {
    this._ToastrService.success("Product added successfully");
  }
}
