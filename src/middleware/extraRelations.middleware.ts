import { NextFunction, Request, Response } from 'express';

export interface QueryBuilderRelation {
	entityName: string,		// name of the entity/relation to join to
	relation: string;		// name od the relation to be joined
	name?: string;			// custom name to name this relation; to be used incase of conflicting relation names
}

export const extraRelations = (relations: string[]) => async (request: Request, response: Response, next: NextFunction) => {
	try {
		request.extraRelations = relations;
		next()
	} catch (error) {
		response.status(error.statusCode || 500).send(error.message || '');
	}
};
export const extraRelationsForQueryBuilder = (relations: QueryBuilderRelation[]) => async (request: Request, response: Response, next: NextFunction) => {
	try {
		request.extraRelations = relations;
		next()
	} catch (error) {
		response.status(error.statusCode || 500).send(error.message || '');
	}
};