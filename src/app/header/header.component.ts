import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from '../services/auth.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticate = false;
  constructor(private authService:AuthServices,private router:Router) { }

  ngOnInit() {
    this.authService.user.subscribe((user)=>{
        if(user && user.token){
          this.isAuthenticate=true
        }else{
          this.isAuthenticate = false
        }
    });
  }

  onLogout(){
    this.authService.logout()  
  }

}
