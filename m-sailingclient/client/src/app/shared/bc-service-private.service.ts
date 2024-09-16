import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BcServicePrivateService {
private breadcrumbsSubject = new BehaviorSubject<any[]>([])
  breadcrumbs$ = this.breadcrumbsSubject.asObservable()
  setBreadCrumbs(breadcrumbs: any[]) {
  this.breadcrumbsSubject.next(breadcrumbs);
  }
}
