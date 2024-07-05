import { TypeORMRepository } from "../../database/TypeORMRepository";
import { BookedSlot } from "./bookedSlot.model";
import { BookedSlotEntity } from "../../database/entity/bookedSlot.entity";

export class BookedSlotRepository extends TypeORMRepository<BookedSlot, BookedSlotEntity> {
  public constructor() {
    super(BookedSlotEntity);
  }

  protected toModel(entity: BookedSlotEntity): BookedSlot {
    return new BookedSlot(entity);
  }

  protected getCriteria(model: BookedSlot): object {
    return { id: model.id };
  }

  public getQueryBuilder() {
    return this.context.createQueryBuilder("bookedSlot");
  }
}
