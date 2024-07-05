import { NextFunction, Request, Response } from "express";

export interface QueryBuilderSearchField {
  name: string; // name of the entity/relation; should be the base entity or a joined in relation
  field: string; // the field in this entity/relation you would like to match against the query string
}

export interface QueryBuilderFilter {
  field: string; // the field in the entity whose value you would like to filter according to
  value: string | ((input: any) => any); // the name of the request parameter from which we will get the value to filter against
  name?: string; // optional paramter for when the field to filter accoring to is not a field of the base entity
  operator?: string; // optional parameter for when the filtering operation to be used is not the simple equiality
  isNotRequestParam?: boolean; // optional parameter to denote that the value to compare to when filtering is not a request parameter value
}

export default function ({
  separateDisabled,
  queryKey,
  disableKey,
  extraSearchFields,
  filter,
  selectAll,
  orderBy,
}: {
  separateDisabled?: boolean;
  queryKey?: string;
  disableKey?: string;
  extraSearchFields?: QueryBuilderSearchField[];
  filter?: QueryBuilderFilter[];
  selectAll?: boolean;
  orderBy?: {column:string, entity?:string}[];
} = {}) {
  return async (request: Request, response: Response, next: NextFunction) => {
    if (!selectAll) {
      const page = +request.query.page || 1;
      const page_size = +request.query.page_size || 10;

      request.options = {
        take: page_size,
        skip: (page - 1) * page_size,
      };
    }
    const where: any = {};
    if (request.query.query)
      where[queryKey ? queryKey : "code"] = request.query.query;
    request.separateDisabled = separateDisabled;
    if (separateDisabled) {
      disableKey = disableKey || "archived";
      where[disableKey] = request.query.view ? true : false;
      request.disableKey = disableKey;
    }
    request.where = where;
    if (extraSearchFields) request.extraSearchFields = extraSearchFields;
    if (filter) request.customFilters = filter;
    if (orderBy) request.orderBy = orderBy;
    next();
  };
}
