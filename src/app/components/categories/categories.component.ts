import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/interfaces/product';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit , OnDestroy {

  constructor(
    private _ProductsService:ProductsService,
    private spinner: NgxSpinnerService

  ){}

  getCategoriesSubscribe:Subscription = new Subscription();
  categoryData:Category[] = [];


  ngOnInit(): void {
    this.spinner.show();

    this.getCategoriesSubscribe = this._ProductsService.getCategories().subscribe({
      next:(response)=>{
        this.categoryData = response.data
        this.spinner.hide();

      }
    })
  }

  ngOnDestroy(): void {
    this.getCategoriesSubscribe.unsubscribe();
  }

}
