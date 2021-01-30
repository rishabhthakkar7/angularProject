import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthServices } from 'src/app/services/auth.services';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  id:Number;
  user;
  userForm:FormGroup;
  constructor(private route:ActivatedRoute,
              private authService:AuthServices,
              private router:Router ) { }

  ngOnInit() {
      this.route.params.subscribe((params:Params)=>{
        this.id = + params['id'];
        const Id = +this.id;
      this.user = this.authService.user[Id]
      if(this.user == undefined){
        return this.router.navigate(['/users'])
      }
      this.initForm()
    });
  }

  private initForm(){
    let FullName ='';
    let gender = "male";
    let email = '';
    let password = '';
   
    if(this.id >= 0){
      FullName = this.user.FullName
      gender = this.user.gender
      email = this.user.email
      password = this.user.password
    }
    
    this.userForm = new FormGroup({
      fname: new FormControl(FullName,Validators.required),
      email: new FormControl(email,Validators.required),
      password: new FormControl(password,Validators.required),
      gender: new FormControl(gender,Validators.required)
    })
  }

  onEditSubmit(){
    if(this.userForm.valid){
      console.log()
      // this.authService.updateUser(+this.id ,
      //       {
      //         FullName:this.userForm.get('fname').value,
      //         gender:this.userForm.get('gender').value,
      //         email:this.userForm.get('email').value,
      //         password:this.userForm.get('password').value
      //       }
      // );
      return this.router.navigate(['/users'])
    }
  }

}
