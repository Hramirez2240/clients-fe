import { BaseModel } from "../base.model";

export interface Address extends BaseModel{
  country: string;
  city: string;
  street: string;
  postalCode: string;
  clientId: string;
}
