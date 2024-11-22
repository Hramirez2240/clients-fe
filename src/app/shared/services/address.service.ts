import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Address } from "../models/address/address.model";
import { HttpClient } from "@angular/common/http";
import { BaseResponse } from "../models/base-response.model";

@Injectable({providedIn: 'root'})
export class AddressService extends BaseService<Address>{
  constructor(
    private _http: HttpClient
  )
  {
    super(_http, 'Address');
  }

  getAddressByClientId(clientId: string){
    return this.http.get<BaseResponse<Address[]>>(`${this.baseUrl}/client/${clientId}`);
  }
}
