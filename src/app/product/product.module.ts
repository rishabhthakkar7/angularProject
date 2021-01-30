import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ProductResolver } from "../resolver/product.resolver";
import { ProductAddComponent } from "./product-add/product-add.component";
import { ProductViewComponent } from "./product-view/product-view.component";
import { ProductComponent } from "./product.component";

const routes: Routes = [
    {path:'',component:ProductComponent,children:[
        {path:'add',component:ProductAddComponent},
        {path:':id',component:ProductViewComponent,resolve:{product:ProductResolver}}
    ]}
]
@NgModule({
    declarations:[
        ProductComponent,
        ProductAddComponent,
        ProductViewComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes) 
    ],
    exports: [
        RouterModule  
    ],
    providers:[ProductResolver]
})
export class ProductModule{

}