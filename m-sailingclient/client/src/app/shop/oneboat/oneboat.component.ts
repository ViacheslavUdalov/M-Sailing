import {Component, OnInit} from '@angular/core';
import {Equipment} from "../../models/equipment";
import {ShopService} from "../shop.service";
import {ActivatedRoute} from "@angular/router";
import {Boat} from "../../models/boat";
import { animations } from 'src/app/helpers/animations';

@Component({
  selector: 'app-oneboat',
  templateUrl: './oneboat.component.html',
  styleUrls: ['./oneboat.component.less'],
  animations: [animations]
})
export class OneboatComponent implements OnInit{
  boat: Boat | undefined;
  additional: Boat[] = [];
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
    this.shopService.getOneboat(this.id).subscribe(data => {
      this.boat = data;
    })
  }
  getEquipForHome() {
    this.shopService.getBoats().subscribe(data => {
      this.additional = data.data.slice(0, 4);
    })
  }
  clickToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
