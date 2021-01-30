import { Route } from "@angular/compiler/src/core";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Product } from "../product/product.model";
import { ProductServices } from "../product/product.service";

@Injectable({providedIn:'root'})
export class ProductResolver implements Resolve<Product>{
    constructor(private productService:ProductServices,private router:Router){}
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot ):Observable<Product> | Product{
        const id = +route.params['id']
        //on direct load product detail
        if(this.productService.products.length == 0){
            this.productService.getProduct().subscribe(products=>{
                const product = products[id]
                if(!product){
                    this.router.navigate(['/products'])
                }
                return product
            });

            // this.productService.onProductChange.subscribe(()=>{
            // })
        }else{
            const product = this.productService.products[id]
            if(!product){
                this.router.navigate(['/products'])
            }
            return product
        }
    }
}