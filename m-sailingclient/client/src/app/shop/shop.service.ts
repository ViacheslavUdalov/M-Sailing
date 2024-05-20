import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {delay, Observable, of} from "rxjs";
import {Equipment} from "../models/equipment";
import {Cover} from "../models/cover";
import {Armament} from "../models/armament";
import {Clothes} from "../models/Clothes";
import {map} from "rxjs/operators";
import {Boat} from "../models/boat";
import {environment} from "../../environments/environment";
import {ShopParams} from "../models/shopParams";
import {Pagination, IPagination} from "../models/IPagination";
@Injectable({
  providedIn: 'root'
})

export class ShopService {
  apiUrl = environment.apiUrl;
  shopParams = new ShopParams();
  pagination = new Pagination(1, 10, 0, []);
  equipment: Equipment[] = []
  armament: Armament[] = []
  covers: Cover[] = []
  clothes: Clothes[] = []
  boats: Boat[] = [];
  constructor(private http: HttpClient) { }

  private getItems(endpoint: string) {
    let params = new HttpParams();
    if (this.shopParams.type) {
      params = params.append('type', this.shopParams.type);
    }
    if (this.shopParams.typeForBuy) {
      params = params.append('typeForBuy', this.shopParams.typeForBuy);
    }
    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }
    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageIndex.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());
    return this.http.get<IPagination>(this.apiUrl + endpoint, {observe: 'response', params})
      .pipe(
        map(response => {
          this.pagination = response.body as Pagination;
          return this.pagination;
        })
      )
  }
  
getEquipment(): Observable<IPagination> {
return this.getItems('equipment')
}
setShopParams(params: ShopParams) {
    this.shopParams = params;
}
getShopParams() {
    return this.shopParams;

}
getRandomEquipment() {
return this.http.get<Equipment[]>(this.apiUrl + 'random-equipment')
}
 getRandomArmament() {
   return this.http.get<Armament[]>(this.apiUrl + 'random-armament')
 }
  getCovers(): Observable<Pagination> {
    return this.getItems('covers')
  }
  getArmament() {
    return this.getItems('armament')
  }
  
  getClothes() {
    return this.getItems('clothes')
  }
  getBoats() {
    return this.getItems('boats')
  }
  getOneClothes(id: string) {
   
    return this.http.get<Clothes>(this.apiUrl + 'clothes/' + id)
  }
  getOneEquipment(id: string): Observable<Equipment> {
    return this.http.get<Equipment>(this.apiUrl + 'equipment/' + id)
  }
  getOneCovers(id: string): Observable<Cover> {
    return this.http.get<Cover>(this.apiUrl + 'covers/' + id)
  }
  getOneArmament(id: string) {
    return this.http.get<Armament>(this.apiUrl + 'armament/' + id)
  }
  getOneboat(id: string) {
    
    return this.http.get<Boat>(this.apiUrl + 'boats/' + id)
  }
  
}
