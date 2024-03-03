import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './shared/interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:Product[] ,searchWord:string): Product[] {
    // use filter to filter the search
    // dont user ==    >> we need real life reach
    // use include() >> i filter
    return products.filter( (product)=> product.title.toLowerCase().includes(searchWord.toLowerCase()) );
  }
}
