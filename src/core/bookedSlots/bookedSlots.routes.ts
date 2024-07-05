import { BookedSlotsController } from "../bookedSlots/bookedSlots.controller";
import { Router } from "express";
import { extraRelationsForQueryBuilder } from "../../middleware/extraRelations.middleware";
import * as passport from "passport";
import paginationMiddleware from "src/middleware/pagination.middleware";


export class BookedSlotsRoutes {
    private router: Router;
    private bookedSlotController: BookedSlotsController;

    public constructor() {
        this.router = new Router();
        this.bookedSlotController = new BookedSlotsController();

        this.router.post(
            "/",
            this.bookedSlotController.create.bind(this.bookedSlotController),
        );

        this.router.get(
            "/product/:product_id",
            this.bookedSlotController.getBookedSlotsForProduct.bind(this.bookedSlotController),
        );

        this.router.get(
            "/",
            passport.authenticate("jwt", { session: false }),
            extraRelationsForQueryBuilder([{ entityName: 'bookedSlot', relation: 'product' }, { entityName: 'bookedSlot', relation: 'area' }, { entityName: 'bookedSlot', relation: 'slot' }]),
            paginationMiddleware({separateDisabled:true,queryKey:undefined,disableKey:undefined,extraSearchFields:[{name:'bookedSlot',field:'name'},{name:'bookedSlot',field:'mobileNumber'}], orderBy:[{column:'product_id'},{column:'slot_id'}]}),
            this.bookedSlotController.readManyQB.bind(this.bookedSlotController),
        );

        this.router.delete(
            "/:id",
            passport.authenticate("jwt", { session: false }),
            this.bookedSlotController.archive.bind(this.bookedSlotController),
        );

        this.router.post(
            "/restore/:id",
            passport.authenticate("jwt", { session: false }),
            this.bookedSlotController.unarchive.bind(this.bookedSlotController),
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}