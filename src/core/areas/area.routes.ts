import { AreasController } from "../areas/area.controller";
import { Router } from "express";
import * as passport from "passport";

export class AreasRoutes {
    private router: Router;
    private areaController: AreasController;

    public constructor() {
        this.router = new Router();
        this.areaController = new AreasController();

        this.router.post(
            "/create",
            passport.authenticate("jwt", { session: false }),
            this.areaController.createAreas.bind(this.areaController),
        );

        this.router.get(
            "/",
            this.areaController.get.bind(this.areaController),
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}