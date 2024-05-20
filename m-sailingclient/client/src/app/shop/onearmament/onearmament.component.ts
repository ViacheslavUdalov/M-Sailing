import {Component, OnInit} from '@angular/core';
import {Equipment} from "../../models/equipment";
import {ShopService} from "../shop.service";
import {ActivatedRoute} from "@angular/router";
import {Armament} from "../../models/armament";
import {animations} from "../../helpers/animations";

@Component({
  selector: 'app-onearmament',
  templateUrl: './onearmament.component.html',
  styleUrls: ['./onearmament.component.less'],
  animations: [animations]
})
export class OnearmamentComponent implements OnInit{
  armament: Armament | undefined;
  additional: Armament[] = [];
  id: string = '';
  constructor(private shopService: ShopService, private activeRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id') as string;
      this.getOneProduct();
    })
    this.getArmamentForHome();
  }
  getOneProduct() {
    this.shopService.getOneArmament(this.id).subscribe(data => {
      this.armament = data;
    })
  }
  getArmamentForHome() {
    this.shopService.getRandomArmament().subscribe(data => {
      this.additional = data;
    })
  }
  clickToTop() {
    this.getArmamentForHome()
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
