import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  myToken:any = localStorage.getItem('token');

  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(private _HttpClient:HttpClient) { }

  addToCart(myProductId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      productId:myProductId
    },
    {
      headers:{
        token:this.myToken
      }
    })
  }

  getUserCart():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      headers:{
        token:this.myToken
      }
    })
  }

  removeCartItem(myProductId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${myProductId}`,
    {
      headers:{
        token:this.myToken
      }
    })
  }

  updateProductQuantity(myProductId:string,pCount:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${myProductId}`,
    {
      count:pCount
    },
    {
      headers:{
        token:this.myToken
      }
    })
  }

  clearCartItem():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      headers:{
        token:this.myToken
      }
    })
  }

  // orders section
  checkout(cId:string , userData:object ):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cId}?url=http://localhost:4200`,
    {
      "shippingAddress":userData
    },
    {
      headers:{
        token:this.myToken
      }
    }
    )
  }
}
