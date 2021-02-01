import { NgModule } from "@angular/core";
import { FilterPipe } from "../pipe/filter.pipe";
import { ShortenPipe } from "../pipe/shorten.pipe";
@NgModule({
    declarations:[
        ShortenPipe,
        FilterPipe
    ],
    exports:[
        ShortenPipe,
        FilterPipe
    ]
})
export class SharedModule {

}