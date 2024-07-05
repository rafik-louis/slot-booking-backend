import { TypeORMRepository } from "../../database/TypeORMRepository";
import { Area } from "./area.model";
import { AreaEntity } from "../../database/entity/area.entity";

export class AreaRepository extends TypeORMRepository<
  Area,
  AreaEntity
> {
  public constructor() {
    super(AreaEntity);
  }

  protected toModel(entity: AreaEntity): Area {
    return new Area(entity);
  }

  protected getCriteria(model: Area): object {
    return { id: model.id };
  }

  public getQueryBuilder() {
    return this.context.createQueryBuilder("area");
  }
}
