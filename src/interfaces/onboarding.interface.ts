export interface IOnboarding {
  _id: string;
  title: string;
  subtitle: string;
  answers: IAnswer[];
}

export interface IAnswer {
  title: string;
  subtitle: string;
  icon?: string
}
