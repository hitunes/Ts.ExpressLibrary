import express from 'express'

//singleton
export class AppRouter {
  // static can be accessed without creating an instant of the class
  private static instance: express.Router

  static get getInstance(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }

    return AppRouter.instance
  }
}