import { NextFunction, Request, Response } from 'express';
import { IUser } from '@interfaces/users.interface';
import userService from '@services/users.service';

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const AllUsers: IUser[] = await this.userService.findAllUser();
      res.status(200).json(AllUsers);
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const OneUserData: IUser = await this.userService.findUserById(userId);
      res.status(200).json(OneUserData);
    } catch (error) {
      next(error);
    }
  };

}

export default UsersController;
