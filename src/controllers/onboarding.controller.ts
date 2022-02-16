import { IOnboarding } from '@/interfaces/onboarding.interface';
import OnboardingService from '@/services/onboarding.service';
import { NextFunction, Request, Response } from 'express';


class OnboardingController {
  public onboardingService = new  OnboardingService();

  public getRandomOnboarding = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findRandomData: IOnboarding = await this.onboardingService.findRandomData();
      res.status(200).json(findRandomData);
    } catch (error) {
      next(error);
    }
  };

}

export default OnboardingController;
