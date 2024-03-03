import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Brand } from 'src/app/shared/interfaces/product';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  constructor(
    private _ProductsService:ProductsService,
    private spinner: NgxSpinnerService

  ){}

  getBrandsSubscribe:Subscription = new Subscription();
  brandsData:Brand[] = [];


  ngOnInit(): void {
    this.spinner.show();

    this.getBrandsSubscribe = this._ProductsService.getAllBrands().subscribe({
      next:(response)=>{
        this.brandsData = response.data
        this.spinner.hide();
      }
    })
  }

  ngOnDestroy(): void {
    this.getBrandsSubscribe.unsubscribe();
  }

}
