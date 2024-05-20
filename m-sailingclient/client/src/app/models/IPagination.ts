import { Armament } from "./armament";
import { Boat } from "./boat";
import { Clothes } from "./Clothes";
import { Cover } from "./cover";
import { Equipment } from "./equipment";

export interface IPagination {
  pageIndex: number
  pageSize: number
  count: number
  data: Equipment[] | Cover[] | Clothes[] | Boat[] | Armament[]
}
export class Pagination implements IPagination {
  count: number;
  data: Equipment[] | Cover[] | Clothes[] | Boat[] | Armament[] = [];
  pageIndex: number;
  pageSize: number;

  constructor(pageIndex: number, pageSize: number, count: number, data: Equipment[] | Cover[] | Clothes[] | Boat[] | Armament[] | []) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.count = count;
    this.data = data;
  }

}
