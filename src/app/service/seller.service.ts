import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
private baseurl='http://localhost:3000/seller'
  constructor( private http:HttpClient) { }
 addSeller(data:SignUp){
  return this.http.post(this.baseurl,data)
 }
 userLogin(val:login){
  console.warn(val)
  this.http.get('http://localhost:3000/seller?email=${val.email}&password=${val.password}')

 }
}
