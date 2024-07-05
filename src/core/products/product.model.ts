import { BookedSlot } from "../bookedSlots/bookedSlot.model";


export interface IProduct {
  id?: number;
  name: string;
  code: string;
  bookedSlots?: BookedSlot[];
  archived?: boolean;
}

export class Product {
  public id: number;
  public name: string;
  public code: string;
  public bookedSlots?: BookedSlot[];
  public archived?: boolean;

  public constructor(data: IProduct) {
    Object.assign(this, {
      bookedSlots: [],
      ...data,
    });
  }
}
