import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from './models/user.model';
import { AuthServices } from './services/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  user:User[]=[];
  title = 'project';
  constructor(private authService:AuthServices){}

  ngOnInit(){
    console.log("in app com")
    this.authService.autologin()
  }
}
