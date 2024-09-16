import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BreadcrumbService} from "xng-breadcrumb";
import {BcServicePrivateService} from "../../shared/bc-service-private.service";

@Component({
  selector: 'app-header-breadcrumb',
  templateUrl: './header-breadcrumb.component.html',
  styleUrls: ['./header-breadcrumb.component.less']
})
export class HeaderBreadcrumbComponent implements OnInit{
breadcrumb$?: Observable<any[]>
  constructor(private bsSerice: BreadcrumbService) {
  }

  ngOnInit(): void {
    this.breadcrumb$ = this.bsSerice.breadcrumbs$;
    console.log(this.breadcrumb$);
  }

}
