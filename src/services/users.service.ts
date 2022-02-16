import { HttpException } from '@exceptions/HttpException';
import { Message, User, UserModel } from '@models/users.model';
import { isEmpty } from '@utils/util';
import { IUser } from '@/interfaces/users.interface';
import { DocumentType } from '@typegoose/typegoose';
import { MessageModel } from '../models/users.model';

class UserService {

  public users = UserModel;
  public messages = MessageModel;

  public async findAllUser(): Promise<IUser[]> {
    // getting all users with
    // note: just for demo proposes
    const usersData: DocumentType<User>[] = await this.users.find();

    // mapping users documetns to add hasQuestions flag
    const users = await Promise.all(usersData.map( async(user) => {

      const questions = await user.hasQuestions();

      return {
        _id: user._id,
        email: user.email,
        password: user.password,
        hasQuestions: questions
      };

    }));

    return users;
  }

  public async findUserById(userId: string): Promise<IUser> {

    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const user: DocumentType<User> = await this.users.findOne({ _id: userId });
    if (!user) throw new HttpException(409, "You're not user");

    // getting user messages
    const messagesDocs: DocumentType<Message>[] = await this.messages.find({ user: user._id });

    // mapping users messages to add isQuestion flag
    const messages = await Promise.all( messagesDocs.map( async (message) => {
      const question = await message.isQuestion();
      return {
        _id: message._id,
        text: message.text,
        isQuestion: question
      };
    }) )

    // user.hasQuestions flag based on messages
    const userHasQuestions = messages.map( message => message.isQuestion).some( item => item );

    return {
      _id: user._id,
      email: user.email,
      password: user.password,
      hasQuestions: userHasQuestions,
      messages: messages
    };
  }

}

export default UserService;
