import { Controller } from "../controller";
import { BookedSlot } from "../bookedSlots/bookedSlot.model";
import { BookedSlotRepository } from "../bookedSlots/bookedSlot.repository";
import { Request, Response } from "express";
import BadRequestException from "src/util/exceptions/badRequest.exception";


export class BookedSlotsController extends Controller<BookedSlot> {
    private bookedSlotsRepository: BookedSlotRepository;

    public constructor() {
        super();
        this.bookedSlotsRepository = new BookedSlotRepository();
        this.setRepository(this.bookedSlotsRepository);
        this.setRelations(['product', 'slot','area']);
        this.setName('bookedSlot');
        this.setRequiredFields(['area_id','mobileNumber','name','product_id','slot_id'])
    }

    async checkIfNumberAlreadyUsed(mobileNumber: string): Promise<boolean> {
        let bookings = await this.bookedSlotsRepository.find({ mobileNumber, archived: false });
        return bookings.length > 0;
    }

    async checkIfSlotAlreadyBooked(slot_id: number, product_id: number): Promise<boolean> {
        let bookings = await this.bookedSlotsRepository.find({ slot_id, product_id, archived: false });
        return bookings.length > 0;
    }

    private validatePhoneNumber(number) {
        var regex = /^(\+|\d)[0-9]{7,16}$/;
        return regex.test(number);
    }

    public async create(request: Request, response: Response) {
    try {
        let receivedBookedSlot= {};
        if (this.requiredFields) {
          let missingFields: (keyof BookedSlot)[] = [];
        for (let field of this.requiredFields) {
            if (!request.body[field] && request.body[field] !== 0) {
                missingFields.push(field);
            }
            else {
                receivedBookedSlot[field] = request.body[field];
            }
        }
        if (missingFields.length > 0) throw new BadRequestException(`Missing fields: ${missingFields.join(', ')}`)
        }
        if (this.validatePhoneNumber((receivedBookedSlot as any).mobileNumber) == false) {
            throw new BadRequestException('Invalid mobile number');
        }
        if (await this.checkIfNumberAlreadyUsed((receivedBookedSlot as any).mobileNumber)) {
            throw new BadRequestException('Sorry a reservation has been already made using this phone number');
        }
        if (await this.checkIfSlotAlreadyBooked((receivedBookedSlot as any).slot_id, (receivedBookedSlot as any).product_id)) {
            throw new BadRequestException('Sorry this time slot is already taken');
        }
      const bookedSlot: BookedSlot = await this.repository.save(receivedBookedSlot as BookedSlot);
      response.status(201).send(bookedSlot);
    } catch (error) {
      response.status(error.statusCode || 500).send(error.message || "");
    }
    }
    
    public async getBookedSlotsForProduct(request: Request, response: Response) {
        try {
            const { product_id } = request.params;
            let bookedSlots = await this.bookedSlotsRepository.getQueryBuilder()
                .where('product_id = :product_id', { product_id: product_id })
                .leftJoin("bookedSlot.slot", "slot")
                .andWhere('bookedSlot.archived = false and slot.archived = false')
                .select('slot.id')
                .getRawMany();
            response.status(200).send(bookedSlots);
        } catch (error) {
            response.status(error.statusCode || 500).send(error.message || "");
        }
      }

}