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
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,image:string,
    id:string

}