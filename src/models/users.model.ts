import { prop, getModelForClass, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import TextService from '../services/text.service';

@modelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
export class User {
  @prop({ type: String, required: true, unique: true })
  public email: string;

  @prop({ type: String, required: true })
  public password: string;

  public createdAt?: Date;

  public updatedAt?: Date;

  public async hasQuestions(this: DocumentType<User>): Promise<boolean> {

    // getting user messages
    const messages = await MessageModel.find({ user: this._id });

    // new true/false array using message isQuestion for each message
    const isQuestion = messages.map( message => {
      return message.isQuestion();
    })

    // true if any of messages is a question
    return isQuestion.some( item => item );
  }
}

@modelOptions({ schemaOptions: { collection: 'messages', timestamps: true } })
export class Message {
  @prop({ ref: () => User })
  public user: Ref<User>;

  @prop({ type: String, required: true })
  public text: string;

  public createdAt?: Date;

  public updatedAt?: Date;

  public isQuestion(this: DocumentType<Message>): boolean {
    const textService = new TextService();
    return textService.isSentenceInterrogative(this.text);
  }
}

export const UserModel = getModelForClass(User);
export const MessageModel = getModelForClass(Message);
