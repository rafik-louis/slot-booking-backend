import { ProductsController } from "../products/product.controller";
import { Router } from "express";
import * as passport from "passport";

export class ProductsRoutes {
    private router: Router;
    private productController: ProductsController;

    public constructor() {
        this.router = new Router();
        this.productController = new ProductsController();

        this.router.post(
            "/create",
            passport.authenticate("jwt", { session: false }),
            this.productController.createProducts.bind(this.productController),
        );

        this.router.get(
            "/",
            this.productController.get.bind(this.productController),
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}