import {Controller} from "../controller";
import {Slot} from "../slots/slot.model";
import { SlotRepository } from "../slots/slot.repository";
import { Request, Response } from "express";
import * as slots from '../../../system-config/slots.json';

export class SlotsController extends Controller<Slot> {
    private slotRepository: SlotRepository;

    public constructor() {
        super();
        this.slotRepository = new SlotRepository();
        this.setRepository(this.slotRepository);
        this.setRelations(['bookedSlots']);
        this.setName('slot');
    }

    public async get(request: Request, response: Response) {
        try {
            let slots = await this.slotRepository.getQueryBuilder()
                .where('archived = false')
                .getMany();
            response.status(201).send(slots);
        } catch (error) {
            response.status(error.statusCode || 500).send(error.message || "");
        }
    }

    public async createSlots(request: Request, response: Response) {
        try {
            for (let slot of slots) {
                await this.slotRepository.save(slot);
            }
            response.status(201).send('success');
        } catch (error) {
            response.status(error.statusCode || 500).send(error.message || "");
        }
    }
}