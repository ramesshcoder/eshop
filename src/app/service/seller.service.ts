import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
private baseurl='http://localhost:3000/seller'
  constructor( private http:HttpClient) { }
 addSeller(data:SignUp){
  return this.http.post(this.baseurl,data)
 }
}
