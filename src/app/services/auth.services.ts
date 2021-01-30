import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../auth/user.model';
// import { User } from '../models/user.model';

export interface AuthResponse{
    'idToken':string,
    'email':string,
    'refreshToken':string,
    'expiresIn':string,
    'localId':string,
    'registered?':string,
}

@Injectable ({
    providedIn:'root'
})
export class AuthServices {
    user = new BehaviorSubject<User>(null);
    // OnUserChange = new Subject<User[]>();
    private ExpirationTimeout:any

    constructor(private http:HttpClient,private router:Router){}

    addUser(form){
       return this.http.post<AuthResponse>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.firebaseAPIKey,
            form)
            .pipe(
                tap(resData =>{
                    const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
                    let user = new User(resData.email,resData.localId,resData.idToken,expirationDate)
                    this.user.next(user)
                    localStorage.setItem('userData',JSON.stringify(user))
                })
            );
    }

    login(email,password){
        return this.http.post<AuthResponse>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.firebaseAPIKey,
            {email,password,returnSecureToken:true})
        .pipe(
            tap(resData =>{
                const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
                let user = new User(resData.email,resData.localId,resData.idToken,expirationDate)
                this.user.next(user)
                localStorage.setItem('userData',JSON.stringify(user))
                this.autologout((+resData.expiresIn * 1000))
            })
        )
    }

    autologin(){
        let user = JSON.parse(localStorage.getItem('userData'))
        if(!user){
            return
        }

        let localUser = new User(user.email,user.id,user._token,user._tokenExpirationDate)

        if(localUser.token){
            this.user.next(localUser)
            let Duration = new Date(user._tokenExpirationDate).getTime()-new Date().getTime()
            this.autologout(Duration)
        }
    }

    autologout(ExpirationDuration:number){
        console.log(ExpirationDuration)
        this.ExpirationTimeout =  setTimeout(()=>{
            this.logout()
        },ExpirationDuration)
    }

    logout(){
        this.user.next(null)
        localStorage.removeItem('userData')
        if(this.ExpirationTimeout){
            clearTimeout(this.ExpirationTimeout)
        }
        this.ExpirationTimeout=null
        this.router.navigate(['/auth'])
    }

    // getUsers(){
    //  this.http.get('https://angularproject-d5508-default-rtdb.firebaseio.com/users.json').subscribe((data:User[])=>{
    //     // this.user = data;
    //     console.log("in get")
    //     console.log(data)
    //     this.setUsers(this.user)
    //   });
    // }

    // setUsers(users:User[]){
    //     this.user = users;
    //     this.OnUserChange.next(this.user);
    // }

    // updateUser(index:number,user:User){
    //     this.user[index] = user
    //     this.http.patch('https://angularproject-d5508-default-rtdb.firebaseio.com/users/'+ index +'.json',user)
    //     .subscribe(data=>{
    //         this.OnUserChange.next(this.user);
    //     });
    // }

    // deleteUser(index:number){
    //     this.user.splice(index,1)
    //     this.http.put('https://angularproject-d5508-default-rtdb.firebaseio.com/users.json',this.user)
    //     .subscribe(data=>{
    //         this.OnUserChange.next(this.user);
    //     });
    // }
}