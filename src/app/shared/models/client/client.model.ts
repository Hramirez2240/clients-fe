import { Address } from "../address/address.model";
import { BaseModel } from "../base.model";

export interface Client extends BaseModel{
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addresses: Address[];
}
