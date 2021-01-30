import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product.model';
import { ProductServices } from '../product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm:FormGroup
  constructor(private productService:ProductServices) { }
  
  get rawControls(){
    return (this.productForm.get('raw') as FormArray).controls;
  }
  ngOnInit() {
    this.productForm = new FormGroup({
      // id:new FormControl(''),
      name: new FormControl('',Validators.required),
      price:new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$") ]),
      cost:new FormControl('',Validators.required),
      created:new FormControl(new Date()),
      raw:new FormArray([])
    })
  }

  onAddraw(){
    (<FormArray>this.productForm.get('raw')).push(
      new FormGroup({
        name: new FormControl(null,Validators.required),
        unit: new FormControl(null,Validators.required)
      })
    )
  }

  SubmitProduct(){
    if(this.productForm.valid){  
      const product:Product = this.productForm.value
      this.productService.addProduct(product)
    }
  }

  onRemove(id){
    (<FormArray>this.productForm.get('raw')).removeAt(id)
  }

}
