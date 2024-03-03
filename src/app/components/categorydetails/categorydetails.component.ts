import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/interfaces/product';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss']
})
export class CategorydetailsComponent implements OnInit , OnDestroy {

  constructor(
    private _ProductsService:ProductsService,
    private _ActivatedRoute:ActivatedRoute,
    private spinner: NgxSpinnerService

  ){}

  _ActivatedRouteSubscribe:Subscription = new Subscription();
  getCategoryDetailsSubscribe:Subscription = new Subscription();

  categoryData:Category = {} as Category;
  categoryId:any;

  ngOnInit(): void {
    this.spinner.show();
    this._ActivatedRouteSubscribe = this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        // console.log(params)
        this.categoryId = params.get('cateId')
      }
    })

    this._ProductsService.getCategoryDetails(this.categoryId).subscribe({
      next:(response)=>{
        this.categoryData = response.data;
        this.spinner.hide();
        // console.log(response)
      }
    })
  }

  ngOnDestroy(): void {
    this._ActivatedRouteSubscribe.unsubscribe();
    this.getCategoryDetailsSubscribe.unsubscribe();
  }
}
