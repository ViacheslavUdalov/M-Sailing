import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dataproductshelper',
  templateUrl: './dataproductshelper.component.html',
  styleUrls: ['./dataproductshelper.component.less']
})
export class DataproductshelperComponent{
@Input() data: any[] = [];
@Input() title: string = ''

}
