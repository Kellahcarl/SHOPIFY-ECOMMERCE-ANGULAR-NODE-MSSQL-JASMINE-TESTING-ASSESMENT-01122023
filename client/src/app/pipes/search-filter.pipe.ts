import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../types/productService';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(products: Product[], searchTerms: string): any[] {
    if (!products || !searchTerms) {
      return products;
    }

    const filtered: Product[] = [];

    for (let product of products) {
      if (
        product.title.toLowerCase().includes(searchTerms.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerms.toLowerCase()) 

      ) {
        filtered.push(product);
      }
    }
    // console.log(filtered);

    return filtered;
  }
}
