import { Router } from "express";
import { UserRoutes } from "./users/users.routes";
import { ProductsRoutes } from "./products/product.routes";
import { BookedSlotsRoutes } from "./bookedSlots/bookedSlots.routes";
import { SlotsRoutes } from "./slots/slot.routes";
import { AreasRoutes } from "./areas/area.routes";

export class AppRoutes {
  private router: Router = new Router();
  private userRoutes: UserRoutes = new UserRoutes();

  private productRoutes = new ProductsRoutes();
  private bookedSlotRoutes = new BookedSlotsRoutes();
  private slotRoutes = new SlotsRoutes();
  private areaRoutes = new AreasRoutes();

  public constructor() {
    this.router.use("/users", this.userRoutes.getRouter());

    this.router.use(
      "/products",
      this.productRoutes.getRouter()
    );

    this.router.use(
      "/bookedSlots",
      this.bookedSlotRoutes.getRouter()
    );

    this.router.use(
      "/slots",
      this.slotRoutes.getRouter()
    );

    this.router.use(
      "/areas",
      this.areaRoutes.getRouter()
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
