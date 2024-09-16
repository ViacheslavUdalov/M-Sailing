import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ShopService} from "../shop/shop.service";

@Injectable({
  providedIn: 'root'
})
export class ArmamentResolver implements Resolve<any> {
  constructor(private productService: ShopService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = Number(route.paramMap.get('id'));
    return this.productService.getOneArmament(id); // Для получения данных по оружию
  }
}

@Injectable({
  providedIn: 'root'
})
export class CoversResolver implements Resolve<any> {
  constructor(private productService: ShopService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = Number(route.paramMap.get('id'));
    return this.productService.getOneCovers(id); // Для получения данных по одежде
  }
}

@Injectable({
  providedIn: 'root'
})
export class BoatsResolver implements Resolve<any> {
  constructor(private productService: ShopService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = Number(route.paramMap.get('id'));
    return this.productService.getOneboat(id); // Для получения данных по яхтам
  }
}

@Injectable({
  providedIn: 'root'
})
export class EquipmentResolver implements Resolve<any> {
  constructor(private productService: ShopService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = Number(route.paramMap.get('id'));
    return this.productService.getOneEquipment(id); // Для получения данных по яхтам
  }
}
