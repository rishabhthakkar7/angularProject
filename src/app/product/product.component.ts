import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductServices } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products:Product[]
  constructor(private productService:ProductServices) { }

  ngOnInit() {
    this.productService.getProduct().subscribe();
    this.productService.onProductChange.subscribe(()=>{
      this.products=this.productService.products;
    })
  }

  productView(id){
  }

}
