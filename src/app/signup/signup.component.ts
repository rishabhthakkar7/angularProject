import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthServices } from '../services/auth.services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  gender:string ='male';
  constructor(private authService:AuthServices,private router: Router) { }

  ngOnInit() {
    // this.authService.getUsers()
  }

  onSignup(signupform:NgForm){
    if(signupform.valid){
      const f = signupform.form.value;
      const form = {'email':f.email,'password':f.password}
      this.authService.addUser(form)
      signupform.reset()
      this.router.navigate(['/auth'])
    }
   
  }

  // onSignup(signupform:NgForm){
  //   if(signupform.valid){
  //     const f = signupform.form.value;
  //     const form = {'FullName':f.FullName,'email':f.email,'password':f.password,'gender':f.gender}
  //     this.authService.addUser(form)
  //   }
   
  // }

}
