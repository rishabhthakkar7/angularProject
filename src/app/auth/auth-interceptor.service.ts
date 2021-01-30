import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthServices } from "../services/auth.services";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService:AuthServices){}

    intercept(req:HttpRequest<any>,next:HttpHandler){
        // this.
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user=>{
                if(!user){
                    return next.handle(req);
                }
                const modifiedReq =  req.clone({
                    params:new HttpParams().set('auth',user.token)
                })
                return next.handle(modifiedReq);
            })
        )
    }
}