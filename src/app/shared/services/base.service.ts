import { Inject, Injectable } from "@angular/core";
import { BaseModel } from "../models/base.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { BaseResponse } from "../models/base-response.model";

@Injectable({providedIn: 'root'})
export class BaseService<T extends BaseModel>{
  public baseUrl: string = '';
  constructor(
    public http: HttpClient, @Inject('controller') controller: string
  )
  {
    this.baseUrl = `${environment.apiUrl}/${controller}`;
  }

  get(): Observable<BaseResponse<T[]>>{
    return this.http.get<BaseResponse<T[]>>(this.baseUrl);
  }

  getById(id: string): Observable<BaseResponse<T>>{
    return this.http.get<BaseResponse<T>>(`${this.baseUrl}/${id}`);
  }

  post(request: T): Observable<BaseResponse<T>>{
    return this.http.post<BaseResponse<T>>(this.baseUrl, request);
  }

  put(request: T): Observable<BaseResponse<T>>{
    return this.http.put<BaseResponse<T>>(`${this.baseUrl}/${request.id}`, request);
  }

  delete(id: string): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
