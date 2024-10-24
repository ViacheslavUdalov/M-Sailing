import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Equipment} from "../../models/equipment";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductAdminService {
  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  createProduct(product: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(this.baseUrl + 'adminproducts/create-equip', product, {
      withCredentials: true
    });
  }
  updateProduct(productId: number, product: Equipment): Observable<Equipment> {
    console.log('productService => 0000000000000000000')
    console.log(productId)
    console.log(product)
    product.id = productId
    return this.http.put<Equipment>(this.baseUrl + `adminproducts/update-equip/${productId}`, product, {
      withCredentials: true
    });
  }
}
