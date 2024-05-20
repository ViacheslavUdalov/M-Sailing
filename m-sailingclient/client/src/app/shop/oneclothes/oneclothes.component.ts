import {Component, OnInit} from '@angular/core';
import {Equipment} from "../../models/equipment";
import {ShopService} from "../shop.service";
import {ActivatedRoute} from "@angular/router";
import {Clothes} from "../../models/Clothes";
import {animations} from "../../helpers/animations";

@Component({
  selector: 'app-oneclothes',
  templateUrl: './oneclothes.component.html',
  styleUrls: ['./oneclothes.component.less'],
  animations: [animations]
})
export class OneclothesComponent implements OnInit{
  clothes: Clothes | undefined;
  additional: Equipment[] = [];
  id: string = '';
  constructor(private shopService: ShopService, private activeRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(params => {
      this.id = params.get('id') as string;
      console.log(this.id)
      this.getOneProduct();
    })
    this.getEquipForHome();
    console.log(this.additional)
  }
  getOneProduct() {
    this.shopService.getOneClothes(this.id).subscribe(data => {
      console.log(data)
      this.clothes = data;
    })
  }
  getEquipForHome() {
    this.shopService.getRandomEquipment().subscribe(data => {
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
