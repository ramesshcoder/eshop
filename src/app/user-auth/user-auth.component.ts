import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { SignUp } from '../data-type';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  constructor(private user:UsersService){}
  ngOnInit():void{
    this.user.userReload()
  }
  signUP(data:SignUp){
    this.user.userSignUp(data)

  }

}
