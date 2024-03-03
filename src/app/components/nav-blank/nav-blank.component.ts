import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthnService } from 'src/app/shared/service/authn.service';
import { CartService } from 'src/app/shared/service/cart.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {
  constructor(
    private _AuthnService:AuthnService,
    private _CartService:CartService,
    private _WishlistService:WishlistService,
    private _Renderer2:Renderer2
  ){}

  cartNum:number = 0;
  favNum:number = 0;
  loggedUserNAme:any;

  ngOnInit(): void {

    this._AuthnService.userNameDisplay.subscribe({
      next: (name)=>{
        this.loggedUserNAme = name;
      }
    })

    this._CartService.cartNumber.subscribe({
      next:(response)=>{
        this.cartNum = response;
      },
      error:(err)=>{
        console.log(err);
      }
    });

    this._WishlistService.favNumber.subscribe({
      next:(response)=>{
        console.log('wishlist number' ,response)
        this.favNum = response;
      },
      error:(err)=>{
        console.log(err);
      }
    });

    this._CartService.getUserCart().subscribe({
      next:(response)=>{
        this.cartNum = response.numOfCartItems;
      },
      error:(err)=>{console.log(err)}
    })

    this._WishlistService.getUserWishList().subscribe({
      next:(response)=>{
        console.log('wishlist' ,response)
        this.favNum = response.count;
      },
      error:(err)=>{console.log(err)}
    })

  }

  logOutUser():void {
    this._AuthnService.SignOut();
  }

  @ViewChild('navBar') navElement!:ElementRef

  @HostListener('window:scroll')
  onscroll():void{
    if(scrollY > 300){
      this._Renderer2.addClass(this.navElement.nativeElement , 'px-5')
      this._Renderer2.addClass(this.navElement.nativeElement , 'shadow')
    }else{
      this._Renderer2.removeClass(this.navElement.nativeElement , 'px-5')
      this._Renderer2.removeClass(this.navElement.nativeElement , 'shadow')
    }
  }
}
