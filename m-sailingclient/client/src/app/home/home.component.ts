import {Component, OnInit} from '@angular/core';
import {ShopService} from "../shop/shop.service";
import {Cover} from "../models/cover";
import {Equipment} from "../models/equipment";
import {Armament} from "../models/armament";
import {animations} from "../helpers/animations";
import { Boat } from '../models/boat';
import { Meta, Title } from '@angular/platform-browser';

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
  constructor(private shopService: ShopService,
              private metaService: Meta, private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Магазин парусного спорта | M-sailing');
    this.metaService.addTags([
      { name: 'description', content: 'Интернет-магазин парусных яхт, вооружения, экипировки. Лучшие бренды, отличные цены.' },
      { name: 'keywords', content: 'M-sailing, m-sailing, msailing, парусный магазин, яхтенный магазин, парусный спорт, купить парусную экипировку, купить одежду для парусного спорта'},
      { name: 'robots', content: 'index, follow' }
    ]);
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
