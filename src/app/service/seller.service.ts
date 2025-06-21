import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private baseurl = 'http://localhost:3000/seller';

  constructor(private http: HttpClient) {}

  // Sign Up
  addSeller(data: SignUp) {
    return this.http.post(this.baseurl, data);
  }

  // Login (Now returns observable)
  userLogin(val: login) {
    return this.http.get(this.baseurl + `?email=${val.email}&password=${val.password}`, {
      observe: 'response'
    });
  }
}
