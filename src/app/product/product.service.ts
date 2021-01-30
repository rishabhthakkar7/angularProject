import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Product } from "./product.model";
@Injectable({
    providedIn:'root'
})
export class ProductServices {
    products:Product[]=[];
    onProductChange = new Subject()
    constructor(private http:HttpClient){}
    
    addProduct(product:Product){
        this.products.push(product);
        this.http.put<any>(
             "https://angularproject-d5508-default-rtdb.firebaseio.com/products.json",
             this.products)
        .subscribe(data=>{
            console.log(data)
                this.onProductChange.next()
        })
    }

    getProduct(){
        return this.http.get(
            "https://angularproject-d5508-default-rtdb.firebaseio.com/products.json"
        ).pipe(tap(product=>{
            let p = JSON.parse(JSON.stringify(product))
            if(p){
                this.products = p
                this.onProductChange.next()
            }
            return this.products
        }));
    }

}