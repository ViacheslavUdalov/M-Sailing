import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateOrderData } from '../models/OrdersModels';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  createOrder(orderData: CreateOrderData): Observable<CreateOrderData> {
    return this.http.post<CreateOrderData>(`${this.apiUrl}createorder/create-order`, orderData);
  }
}
