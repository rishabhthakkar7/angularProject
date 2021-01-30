import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable ({
    providedIn:'root'
})

export class AuthServices {
    user:User[]=[];
    OnUserChange = new Subject<User[]>();
    constructor(private http:HttpClient){}

    addUser(form){
        this.user.push(form)
        this.http.put('https://angularproject-d5508-default-rtdb.firebaseio.com/users.json',this.user)
                .subscribe(data=>{
            this.OnUserChange.next(this.user);
        });
    }

    getUsers(){
     this.http.get('https://angularproject-d5508-default-rtdb.firebaseio.com/users.json').subscribe((data:User[])=>{
        this.user = data;
        console.log("in get")
        console.log(data)
        this.setUsers(this.user)
      });
    }

    setUsers(users:User[]){
        this.user = users;
        this.OnUserChange.next(this.user);
    }

    updateUser(index:number,user:User){
        this.user[index] = user
        this.http.patch('https://angularproject-d5508-default-rtdb.firebaseio.com/users/'+ index +'.json',user)
        .subscribe(data=>{
            this.OnUserChange.next(this.user);
        });
    }

    deleteUser(index:number){
        this.user.splice(index,1)
        this.http.put('https://angularproject-d5508-default-rtdb.firebaseio.com/users.json',this.user)
        .subscribe(data=>{
            this.OnUserChange.next(this.user);
        });
    }
}