import {Component, OnInit} from '@angular/core';
import {Equipment} from "../../models/equipment";
import {ShopService} from "../shop.service";
import {ActivatedRoute} from "@angular/router";
import {Cover} from "../../models/cover";
import {animations} from "../../helpers/animations";
import { Armament } from 'src/app/models/armament';

@Component({
  selector: 'app-onecover',
  templateUrl: './onecover.component.html',
  styleUrls: ['./onecover.component.less'],
  animations: [animations]
})
export class OnecoverComponent implements OnInit {
  cover: Cover | undefined;
  additional: Armament[] = [];
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
    this.shopService.getOneCovers(this.id).subscribe(data => {
      this.cover = data;
    })
  }
  getEquipForHome() {
    this.shopService.getRandomArmament().subscribe(data => {
      this.additional = data;
    })
  }
  clickToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth' // Делает скролл плавным
    });
  }
}
