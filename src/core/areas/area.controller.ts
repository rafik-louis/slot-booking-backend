import {Controller} from "../controller";
import {Area} from "../areas/area.model";
import { AreaRepository } from "../areas/area.repository";
import { Request, Response } from "express";
import * as areas from '../../../system-config/areas.json';

export class AreasController extends Controller<Area> {
    private areaRepository: AreaRepository;

    public constructor() {
        super();
        this.areaRepository = new AreaRepository();
        this.setRepository(this.areaRepository);
        this.setRelations(['bookedSlots']);
        this.setName('area');
    }

    public async get(request: Request, response: Response) {
        try {
            let areas = await this.areaRepository.getQueryBuilder()
                .where('archived = false')
                .getMany();
            response.status(200).send(areas);
        } catch (error) {
            response.status(error.statusCode || 500).send(error.message || "");
        }
    }

    public async createAreas(request: Request, response: Response) {
        try {
            for (let area of areas) {
                await this.areaRepository.save(area);
            }
            response.status(201).send('success');
        } catch (error) {
            response.status(error.statusCode || 500).send(error.message || "");
        }
    }
}