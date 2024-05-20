import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Equipment} from "../../models/equipment";
import {animations} from "../../helpers/animations";
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-oneequipment',
  templateUrl: './oneequipment.component.html',
  styleUrls: ['./oneequipment.component.less'],
  animations: [animations]
})
export class OneequipmentComponent implements OnInit{
  equipment: Equipment | undefined;
  additional: Equipment[] = [];
  id: string = '';
constructor(private shopService: ShopService, private activeRouter: ActivatedRoute) {
}

  ngOnInit(): void {

  this.activeRouter.paramMap.subscribe(params => {
    this.id = params.get('id') as string;
    this.getOneProduct();
  })
    this.getEquipForHome();
  }
  getOneProduct() {
      this.shopService.getOneEquipment(this.id).subscribe(data => {
        this.equipment = data;
      })
    }
    getEquipForHome() {
  this.shopService.getRandomEquipment().subscribe(data => {
    this.additional = data;
  })
    }
  clickToTop() {
  this.getEquipForHome()
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
