import { HttpException } from "@/exceptions/HttpException";
import { IOnboarding } from "@/interfaces/onboarding.interface";
import { Onboarding, OnboardingModel } from "@/models/onboardings.model";
import { DocumentType } from '@typegoose/typegoose';


class OnboardingService {


  public onboarding = OnboardingModel;

  public async findRandomData(): Promise<IOnboarding|any> {

    // some aggregate function, becouse im dont understand why we need it
    // same with the .toJSON(), we already get JSON from the DB.. may be in case its some transform


    const documents: DocumentType<Onboarding>[] = await this.onboarding.aggregate([{ $sample: { size: 1 } }]);
    if (!documents) throw new HttpException(404, "No documents found");

    let onboarding = {};
    if(documents.length == 1) {
      onboarding = documents[0];
    }

    return onboarding;

  }

}

export default OnboardingService;
