import { Pipe, PipeTransform } from "@angular/core";
@Pipe({ 
    name:'filter',
    pure:false
})
export class FilterPipe implements PipeTransform {
    transform(value:any,key:string,search:any){
        if(value.length === 0 || search == ''){
            return value
        }
        const SearchArray=[]
        for(const product of value){
            if(product['name'] === search){
                SearchArray.push(product)
            }
        }
        return SearchArray;
    }
}