import { Router } from "express";
import { UserController } from "./users.controller";

export class UserRoutes {
  private router: Router;
  private userController: UserController;
  

  public constructor() {
    this.router = new Router();
    this.userController = new UserController();

    this.router.post(
      "/login",
      this.userController.login.bind(this.userController)
    );

    this.router.post(
      "/auth/refreshToken",
      this.userController.refreshToken.bind(this.userController)
    );

  }

  public getRouter(): Router {
    return this.router;
  }
}
