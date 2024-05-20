import {Component, OnInit} from '@angular/core';
import {ShopService} from "../shop/shop.service";
import {Cover} from "../models/cover";
import {Equipment} from "../models/equipment";
import {Armament} from "../models/armament";
import {animations} from "../helpers/animations";
import { Boat } from '../models/boat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  animations: [animations]
})
export class HomeComponent implements OnInit {
  equipments: Equipment[] = [];
armament: Armament[] = []
  boats: Boat[] = []
  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void {
      this.shopService.getRandomEquipment().subscribe(data => {
      this.equipments = data
      console.log(this.equipments)
    })
    this.shopService.getRandomArmament().subscribe(data => {
      this.armament = data
      console.log(this.armament)
    })
    this.shopService.getBoats().subscribe(data => {
      this.boats = data.data.slice(0, 4)
      console.log(this.boats)
    })
    }

}
