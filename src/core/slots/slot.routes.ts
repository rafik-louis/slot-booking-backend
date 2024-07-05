import { SlotsController } from "../slots/slot.controller";
import { Router } from "express";
import * as passport from "passport";

export class SlotsRoutes {
    private router: Router;
    private slotController: SlotsController;

    public constructor() {
        this.router = new Router();
        this.slotController = new SlotsController();

        this.router.post(
            "/create",
            passport.authenticate("jwt", { session: false }),
            this.slotController.createSlots.bind(this.slotController),
        );

        this.router.get(
            "/",
            this.slotController.get.bind(this.slotController),
        );

    }

    public getRouter(): Router {
        return this.router;
    }
}