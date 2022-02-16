import OnboardingController from '@/controllers/onboarding.controller';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';

class OnboardingRoute implements Routes {
  public path = '/';
  public router = Router();
  public onboardingController = new OnboardingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}onboarding`, this.onboardingController.getRandomOnboarding);
  }
}

export default OnboardingRoute;
