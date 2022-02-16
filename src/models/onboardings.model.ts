import { prop, getModelForClass, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';

class Answer {
  @prop()
  public title: string;

  @prop()
  public subtitle: string;

  @prop()
  public icon: string;
}

@modelOptions({ schemaOptions: { collection: 'onboardings', timestamps: true, toJSON: { virtuals: true } } })
export class Onboarding {
  @prop({ type: String, required: true, unique: true })
  public title: string;

  @prop({ type: String, required: true })
  public subtitle: string;

  @prop({ type: () => Answer })
  public answers: Answer[];

  public createdAt?: Date;

  public updatedAt?: Date;

}

export const OnboardingModel = getModelForClass(Onboarding);
