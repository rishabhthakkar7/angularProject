import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthServices } from "../services/auth.services";

@Injectable({
    'providedIn':'root'
})
export class AuthGurad implements CanActivate {
    constructor(private authService:AuthServices,private router:Router){

    }
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):
    boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>
    {
        return this.authService.user.pipe(
                take(1),
                map(user=>{
                    if(user){
                        return true
                    }
                    return this.router.createUrlTree(['/auth'])
                })
               )
    }
}