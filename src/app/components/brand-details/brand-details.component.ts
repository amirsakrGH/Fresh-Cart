import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Brand } from 'src/app/shared/interfaces/product';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.scss']
})
export class BrandDetailsComponent {

  constructor(
    private _ProductsService:ProductsService,
    private _ActivatedRoute:ActivatedRoute,
    private spinner: NgxSpinnerService

  ){}

  _ActivatedRouteSubscribe:Subscription = new Subscription();
  getBrandDetailsSubscribe:Subscription = new Subscription();
  brandData:Brand = {} as Brand;
  brandId:any;

  ngOnInit(): void {
    this.spinner.show();
    this._ActivatedRouteSubscribe = this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        // console.log(params)
        this.brandId = params.get('brandId');
      }
    })

    this.getBrandDetailsSubscribe = this._ProductsService.getBrandDetails(this.brandId).subscribe({
      next:(response)=>{
        this.brandData = response.data;
        this.spinner.hide();
        // console.log(response)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  ngOnDestroy(): void {
    this._ActivatedRouteSubscribe.unsubscribe();
    this.getBrandDetailsSubscribe.unsubscribe();
  }
}
