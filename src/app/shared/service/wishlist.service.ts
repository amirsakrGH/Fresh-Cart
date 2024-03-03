import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  myToken:any = localStorage.getItem('token');

  favNumber:BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _HttpClient:HttpClient) { }

  addToWishList(myProductId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
      productId:myProductId
    },
    {
      headers:{
        token:this.myToken
      }
    })
  }

  getUserWishList():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
      headers:{
        token:this.myToken
      }
    })
  }

  removeFromWishList(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      headers:{
        token:this.myToken
      }
    })
  }
}
