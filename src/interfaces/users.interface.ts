export interface IUser {
  _id: string;
  email: string;
  password: string;
  hasQuestions?: boolean;
  messages?: IMessage[];
}

export interface IMessage {
  _id: string;
  text: string;
  isQuestion?: boolean;
}
