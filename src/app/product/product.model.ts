export class Product{
    // public id:number;
    public name:string;
    public raw:any;
    public price:number;
    public cost:number;
    public created:Date

    constructor(name,raw,price,cost,created){
        // this.id=id;
        this.name=name;
        this.raw=raw;
        this.price=price;
        this.cost=cost;
        this.created=created
    }


}



