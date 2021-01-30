import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductServices } from '../product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  productDetail:Product
  id:number
  constructor(private route:ActivatedRoute,private productService:ProductServices,private router:Router ) { }

  ngOnInit() {
    this.id= +this.route.params['id']
    this.route.params.subscribe((params:Params)=>{
      this.id = params['id']
      this.productDetail = this.productService.products[this.id]
      
    });
    this.route.data.subscribe((data:Data)=>{
       this.productDetail = data['product']
    })

    this.productService.onProductChange.subscribe(()=>{
      this.productDetail = this.productService.products[this.id]
      console.log(this.productDetail)
    })
  }

}
