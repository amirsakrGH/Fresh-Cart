import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authPathGuard } from './shared/guards/auth-path.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { CategorydetailsComponent } from './components/categorydetails/categorydetails.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';

const routes: Routes = [
  {path:'',
  canActivate:[authPathGuard],
  component:BlankLayoutComponent ,
  children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent,title:'home'},
    {path:'cart',component:CartComponent,title:'cart'},
    {path:'products',component:ProductsComponent,title:'products'},
    {path:'allorders',component:AllordersComponent,title:'orders'},
    {path:'checkout/:cId',component:CheckoutComponent,title:'payment'},
    {path:'details/:pId',component:DetailsComponent,title:'details'},
    {path:'brands',component:BrandsComponent,title:'brands'},
    {path:'brandDetails/:brandId',component:BrandDetailsComponent,title:'brand details'},
    {path:'categories',component:CategoriesComponent,title:'categories'},
    {path:'catedetails/:cateId',component:CategorydetailsComponent,title:'category details'},
    {path:'wishlist',component:WishlistComponent,title:'wishlist'},
    {path:'forgotpassword',component:ForgotpasswordComponent,title:'forgot password'},
    ]
  },
  {path:'',component:AuthLayoutComponent ,
  children:[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent,title:'login'},
    {path:'register',component:RegisterComponent,title:'register'},
    {path:'forgot',component:ForgotpasswordComponent,title:'forgot password'},
    ]
  },
  {path:'**',component:NotfoundComponent,title:'404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration:'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
