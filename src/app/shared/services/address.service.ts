import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Address } from "../models/address/address.model";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class AddressService extends BaseService<Address>{
  constructor(
    private _http: HttpClient
  )
  {
    super(_http, 'Address');
  }
}
