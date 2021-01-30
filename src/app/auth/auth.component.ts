import { Component, NgModule, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from '../services/auth.services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private authService:AuthServices,private router:Router) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
     const email = form.value.email
     const password = form.value.password

     if(form.valid){
        this.authService.login(email,password).subscribe(data=>{
          form.reset()
          this.router.navigate(['/users'])
        },(error)=>{
            console.log(error)
        });
     } 
  }

}
