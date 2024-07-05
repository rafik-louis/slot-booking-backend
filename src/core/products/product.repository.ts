import { TypeORMRepository } from "../../database/TypeORMRepository";
import { Product } from "./product.model";
import { ProductEntity } from "../../database/entity/product.entity";

export class ProductRepository extends TypeORMRepository<
  Product,
  ProductEntity
> {
  public constructor() {
    super(ProductEntity);
  }

  protected toModel(entity: ProductEntity): Product {
    return new Product(entity);
  }

  protected getCriteria(model: Product): object {
    return { id: model.id };
  }

  public getQueryBuilder() {
    return this.context.createQueryBuilder("product");
  }
}
