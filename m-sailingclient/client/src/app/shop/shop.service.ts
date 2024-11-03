import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, delay, Observable, of} from "rxjs";
import {Equipment} from "../models/equipment";
import {Cover} from "../models/cover";
import {Armament} from "../models/armament";
import {Clothes} from "../models/Clothes";
import {map} from "rxjs/operators";
import {Boat} from "../models/boat";
import {environment} from "../../environments/environment";
import {ShopParams} from "../models/shopParams";
import {Pagination, IPagination} from "../models/IPagination";
import {NotExpr} from "@angular/compiler";
import {reflectTypeEntityToDeclaration} from "@angular/compiler-cli/src/ngtsc/reflection";
import {NavbarComponent} from "../core/navbar.component";
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
  private euroRateSubject = new BehaviorSubject<number>(0);
  euroRate$ = this.euroRateSubject.asObservable();
  // euroRate: number = 0;
  constructor(private http: HttpClient) {
    this.getEuro();
  }

  getEuro() {
    return this.http.get<number>(this.apiUrl + 'main/geteuro').subscribe((rate) => {
      console.log("EEEEEEEEUUUUUUUUUUUUUURRRRRRRRRRRRRROOOOOOOOOOOOOO")
      console.log(rate)
      this.euroRateSubject.next(rate);
    })
  }
  convertToLocalCurrency(value: number) {
   return  this.euroRateSubject.value * value;
  }
  setNewValueForEuro(value: number) {
    this.euroRateSubject.next(value);
    return this.http.put(this.apiUrl  + 'eurovalue/updateeuro/' + value, value, {
      withCredentials: true
    })

  }
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
return this.getItems('main/equipment')
}


setShopParams(params: ShopParams) {
    this.shopParams = params;
}
getShopParams() {
    return this.shopParams;

}
getRandomEquipment() {
return this.http.get<Equipment[]>(this.apiUrl + 'main/random-equipment')
}
 getRandomArmament() {
   return this.http.get<Armament[]>(this.apiUrl + 'main/random-armament')
 }
  getCovers(): Observable<Pagination> {
    return this.getItems('main/covers')
  }
  getArmament() {
    return this.getItems('main/armament')
  }

  getClothes() {
    return this.getItems('main/clothes')
  }
  getBoats() {
    return this.getItems('main/boats')
  }
  getOneClothes(id: number) {

    return this.http.get<Clothes>(this.apiUrl + 'main/clothes/' + id)
  }
  getOneEquipment(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(this.apiUrl + 'main/equipment/' + id)
  }
  getOneCovers(id: number): Observable<Cover> {
    return this.http.get<Cover>(this.apiUrl + 'main/covers/' + id)
  }
  getOneArmament(id: number) {
    return this.http.get<Armament>(this.apiUrl + 'main/armament/' + id)
  }
  getOneboat(id: number) {

    return this.http.get<Boat>(this.apiUrl + 'main/boats/' + id)
  }

}
