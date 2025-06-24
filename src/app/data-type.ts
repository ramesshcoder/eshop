import { StringToken } from "@angular/compiler"

export interface SignUp{
    name:string,
    password:string,
    email:string,
    number:number
}
export interface login{
    email:string,
    password:string
}
export interface products{
  [x: string]: any
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,image:string,
    id:string
    quantity:undefined|number,
    priductId:undefined|number

}
export interface cart{
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,image:string,
    id:string|undefined
    quantity:undefined|number,
    userId:string,
    productId:string

}