import { BookedSlot } from "../bookedSlots/bookedSlot.model";


export interface ISlot {
  id?: number;
  name: string;
  bookedSlots?: BookedSlot[];
  archived?: boolean;
}

export class Slot {
  public id: number;
  public name: string;
  public bookedSlots?: BookedSlot[];
  public archived?: boolean;

  public constructor(data: ISlot) {
    Object.assign(this, {
      bookedSlots: [],
      ...data,
    });
  }
}
