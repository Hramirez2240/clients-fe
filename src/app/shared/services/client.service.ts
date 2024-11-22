import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Client } from "../models/client/client.model";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class ClientService extends BaseService<Client>{
  constructor(
    private _http: HttpClient
  )
  {
    super(_http, 'Client');
  }
}
