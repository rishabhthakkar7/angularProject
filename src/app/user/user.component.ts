import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AuthServices } from '../services/auth.services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnDestroy{
  user:User[];
  userdetailId;
  DetailUser:User;
  subscription: Subscription;

  constructor(private authService:AuthServices) { 
  }

  ngOnInit() {
    //  this.user = this.authService.user
    //  if(this.user.length == 0){
    //     this.authService.getUsers()
    //  }
    //  this.subscription = this.authService.OnUserChange.subscribe((data)=>{
    //    this.user= data
    //    console.log(this.user)
  
    //  })
     
  }

  ngOnDestroy(){
    // this.subscription.unsubscribe()
  }

  SelectUser(Id){
    this.userdetailId = Id;
    this.DetailUser= this.user[Id]
  }

  deleteUser(id:number){
    //  this.authService.deleteUser(id)
  }
}
