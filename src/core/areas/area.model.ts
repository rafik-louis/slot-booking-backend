import { BookedSlot } from "../bookedSlots/bookedSlot.model";


export interface IArea {
  id?: number;
  name: string;
  bookedSlots?: BookedSlot[];
  archived?: boolean;
}

export class Area {
  public id: number;
  public name: string;
  public bookedSlots?: BookedSlot[];
  public archived?: boolean;

  public constructor(data: IArea) {
    Object.assign(this, {
      bookedSlots: [],
      ...data,
    });
  }
}
