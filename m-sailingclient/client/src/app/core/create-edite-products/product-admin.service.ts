import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Equipment} from "../../models/equipment";
import {environment} from "../../../environments/environment";
import {Armament} from "../../models/armament";

@Injectable({
  providedIn: 'root'
})
export class ProductAdminService {
  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  createEquipProduct(product: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(this.baseUrl + 'adminproducts/create-equip', product, {
      withCredentials: true
    });
  }
  createArmamProduct(product: Armament): Observable<Armament> {
    return this.http.post<Armament>(this.baseUrl + 'adminproducts/create-armam', product, {
      withCredentials: true
    });
  }
  updateEquipProduct(productId: number, product: Equipment): Observable<Equipment> {
    console.log('productService => 0000000000000000000')
    console.log(productId)
    console.log(product)
    product.id = productId
    return this.http.put<Equipment>(this.baseUrl + `adminproducts/update-equip/${productId}`, product, {
      withCredentials: true
    });
  }
  updateArmamProduct(productId: number, product: Armament): Observable<Armament> {
    console.log('productService => 0000000000000000000')
    console.log(productId)
    console.log(product)
    product.id = productId
    return this.http.put<Armament>(this.baseUrl + `adminproducts/update-armam/${productId}`, product, {
      withCredentials: true
    });
  }

  uploadProductImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}upload/uploadimage`, formData);
  }
}
