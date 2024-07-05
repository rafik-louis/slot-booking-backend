import { TypeORMRepository } from "../../database/TypeORMRepository";
import { Slot } from "./slot.model";
import { SlotEntity } from "../../database/entity/slot.entity";

export class SlotRepository extends TypeORMRepository<
  Slot,
  SlotEntity
> {
  public constructor() {
    super(SlotEntity);
  }

  protected toModel(entity: SlotEntity): Slot {
    return new Slot(entity);
  }

  protected getCriteria(model: Slot): object {
    return { id: model.id };
  }

  public getQueryBuilder() {
    return this.context.createQueryBuilder("slot");
  }
}
