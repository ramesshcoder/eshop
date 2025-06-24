import { Injectable } from '@angular/core';
import { SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient,private router:Router) { }
  userSignUp(user:SignUp){
   this.http.post(`http://localhost:3000/users`,user,{observe:'response'}).subscribe((result)=>{
    console.warn(result)
    if(result){
      localStorage.setItem('user',JSON.stringify(result.body))
      this.router.navigate(['/'])
    }
   })
  }
  userReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
  userLogin(data:SignUp){
    this.http.get<SignUp[]>(`http://localhost:3000/users?=email=${data.email}&password=${
      data.password}`).subscribe((result)=>{
        if(result && result.length > 0){
           localStorage.setItem('user',JSON.stringify(result[0]))
      this.router.navigate(['/'])
          
        }
      })

  }
}

