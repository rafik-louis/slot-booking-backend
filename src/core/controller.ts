import { IRepository } from "src/database/IRepository";
import { NextFunction, Request, Response } from "express";
import NotFoundException from "../util/exceptions/notFound.exception";
const _ = require("lodash");
import { deleteExtraFields } from "../util/deleteExtraFields";
import { Brackets } from "typeorm";

export abstract class Controller<Model> {
  protected repository: IRepository<Model>;
  protected name: string;
  protected relations: string[] = [];
  protected primaryKeys: string[] = ["id"];
  protected readOneRelation: String[];
  protected readManyRelation: String[];
  protected requiredFields: (keyof Model)[];

  public setName(name: string) {
    this.name = name;
  }
  public setRelations(relations: string[]) {
    this.relations = relations;
  }

  public setRepository(repository: IRepository<Model>) {
    this.repository = repository;
  }

  public setRequiredFields(requiredFields: (keyof Model)[]) {
    this.requiredFields = requiredFields;
  }

  public async readManyQB(request: Request, response: Response, next: NextFunction) {
    try {
      if (this.name && this.repository["getQueryBuilder"]) {
        let baseQuery = this.repository["getQueryBuilder"]();
        let search: string[] = [];

        if (request.extraRelations) {
          for (let extraRelation of request.extraRelations) {
            baseQuery.leftJoinAndSelect(
              `${extraRelation.entityName}.${extraRelation.relation}`,
              `${extraRelation.name ? extraRelation.name : extraRelation.relation}`
            );
          }
        }

        if (request.extraSearchFields) {
          for (let extraSearchFiled of request.extraSearchFields) {
            search.push(`"${extraSearchFiled.name}"."${extraSearchFiled.field}"`);
          }
        }

        let query: string = request.query.query;

        if (search.length > 0 && query) {
          baseQuery.andWhere(new Brackets((qb) => {
            let bracketsBaseQuery = qb.where(`${search[0]}::text Ilike :query`, { query: `%${query}%` });
            for (let i = 1; i < search.length; i++) {
              bracketsBaseQuery.orWhere(`${search[i]}::text Ilike :query`, { query: `%${query}%` });
            }
          }))

        }
        if (request.separateDisabled) {
          baseQuery.andWhere(` ${this.name}.${request.disableKey} = :view`, { view: request.where[request.disableKey] });

        }
        if (request.customFilters) {
          let i = 0;
          for (let customFilter of request.customFilters) {
            let name = 'value' + i;
            baseQuery.andWhere(`${customFilter.name ? customFilter.name : this.name}.${customFilter.field} ${customFilter.operator ? customFilter.operator : '='} :${name}`, { [name]: customFilter.isNotRequestParam ? await customFilter.value() : request.params[customFilter.value] });
            i++;
          }
        }
        if (request.options) {
          baseQuery.skip(request.options.skip);
          baseQuery.take(request.options.take);
        }
        if (request.orderBy) {
          for (let order of request.orderBy) {
            baseQuery.addOrderBy(`${order.entity||this.name}.${order.column}`,'ASC');
          }
        }
        let [data, count]: [Model[], number] = await baseQuery.getManyAndCount();
        if (request.postProcessing) await request.postProcessing({ data, count });
        if (request.forwardData) {
          request.response = response;
          request.response.data = { data, count };
          return next();
        }
        response.send({
          data,
          count,
        });
      } else {
        throw new Error("could not complete operation");
      }
    } catch (error) {
      response.status(error.statusCode || 500).send(error.message || "");
    }
  }

  public async archive(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const item: Model = await this.repository.findOne({ id });
      if (!item) {
        throw new NotFoundException();
      }
      deleteExtraFields(item, ["archived", ...this.primaryKeys]);
      const updateItem: Model = _.assign(item, { archived: true });
      const updatedItem: Model = await this.repository.save(updateItem);
      response.send(updatedItem);
    } catch (error) {
      response.status(error.statusCode || 500).send(error.message || "");
    }
  }

  public async unarchive(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const item: Model = await this.repository.findOne({ id });
      if (!item) {
        throw new NotFoundException();
      }
      deleteExtraFields(item, ["archived", ...this.primaryKeys]);
      const updateItem: Model = _.assign(item, { archived: false });
      const updatedItem: Model = await this.repository.save(updateItem);
      response.send(updatedItem);
    } catch (error) {
      response.status(error.statusCode || 500).send(error.message || "");
    }
  }
}
