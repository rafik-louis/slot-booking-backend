import {
  Repository,
  getRepository,
  ObjectType,
  FindManyOptions,
  FindConditions,
  SaveOptions,
} from "typeorm";
import { IRepository } from "./IRepository";

export abstract class TypeORMRepository<Model, Entity>
  implements IRepository<Model> {
  protected context: Repository<Entity>;

  public constructor(type: ObjectType<Entity>) {
    this.context = getRepository(type);
  }

  public async findAll(): Promise<Model[]> {
    return (await this.context.find()).map((entity) => this.toModel(entity));
  }

  public async find(options?: FindManyOptions<Entity>): Promise<Model[]>;
  public async find(conditions?: FindConditions<Entity>): Promise<Model[]>;
  public async find(
    conditions?: FindConditions<Entity> | FindManyOptions<Entity>
  ): Promise<Model[]> {
    return (await this.context.find(conditions)).map((entity) =>
      this.toModel(entity)
    );
  }

  public async findAndCount(
    options?: FindManyOptions<Entity>
  ): Promise<[Model[], number]> {
    let [entities, count] = await this.context.findAndCount(options);
    return [entities.map((entity) => this.toModel(entity)), count];
  }

  public async findOne(
    options?: FindManyOptions<Entity>
  ): Promise<Model | undefined>;
  public async findOne(
    conditions?: FindConditions<Entity>
  ): Promise<Model | undefined>;
  public async findOne(
    conditions?: FindConditions<Entity> | FindManyOptions<Entity>
  ): Promise<Model | undefined> {
    const entities = await this.context.find(conditions);
    if (entities.length === 0) {
      return undefined;
    }

    return this.toModel(entities[0]);
  }

  public async save(model: Model, options?: SaveOptions): Promise<Model> {
    const entity = await this.context.save(model, options);
    return this.toModel(entity);
  }

  public async delete(model: Model): Promise<void> {
    await this.context.delete(this.getCriteria(model));
  }

  public async count(
    options?: FindManyOptions<Entity>
  ): Promise<number | undefined>;
  public async count(
    conditions?: FindConditions<Entity>
  ): Promise<number | undefined>;
  public async count(
    conditions?: FindConditions<Entity> | FindManyOptions<Entity>
  ): Promise<number | undefined> {
    const count = await this.context.count(conditions);
    return count;
  }

  public abstract getQueryBuilder();

  protected abstract toModel(entity: Entity): Model;
  protected abstract getCriteria(model: Model): object;
}
