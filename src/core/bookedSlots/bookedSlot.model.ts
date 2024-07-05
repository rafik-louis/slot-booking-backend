import { Product } from "../products/product.model";
import { Slot } from "../slots/slot.model";
import { Area } from "../areas/area.model";

export interface IBookedSlot {
  id?: number;
  name: string;
  mobileNumber: string;
  area_id: number;
  area?: Area;
  slot_id: number;
  slot?: Slot;
  product_id: number;
  product: Product;
  archived?: boolean;
}

export class BookedSlot {
  public id: number;
  public name: string;
  public mobileNumber: string;
  public area_id: number;
  public area: Area;
  public slot_id: number;
  public slot: Slot;
  public product_id: number;
  public product: Product;
  public archived: boolean;

  public constructor(data: IBookedSlot) {
    Object.assign(this, {
      ...data,
    });
  }
}
