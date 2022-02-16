
import mongoose, { disconnect, connect } from 'mongoose';
import request from 'supertest';
import App from '../app';
import UsersRoute from '../routes/users.route';
import { dbConnection } from '../databases';
import { Seeder } from 'mongo-seeding';
import path from 'path';
import { IUser } from '../interfaces/users.interface';
const fs = require('fs');


beforeEach(async () => {
  connect(dbConnection);
  const seeder = new Seeder({
    database: dbConnection,
    dropDatabase: true,
  });
  const collections = seeder.readCollectionsFromPath(path.resolve('src/databases/data'));
  await seeder.import(collections)
});

afterEach(async () => {
  disconnect();
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {

  describe('[GET] /users', () => {
    it('response getUsers', async () => {
      const usersRoute = new UsersRoute();
      const app = new App([usersRoute]);
      const result = await request(app.getServer()).get(`${usersRoute.path}`).expect(200);
      expect(typeof result.body[0].email).toBe('string');
      expect(typeof result.body[0].hasQuestions).toBe('boolean');
    });
  });

  describe('[GET] /users/:id', () => {
    it('response getUserById', async () => {
      // const userId = 'qpwoeiruty';

      const usersRoute = new UsersRoute();

      const userId = '5e850bd669a10e42d07414c0';
      const app = new App([usersRoute]);
      const result = await request(app.getServer()).get(`${usersRoute.path}/${userId}`).expect(200);
      expect(typeof result.body.email).toBe('string');
      expect(typeof result.body.hasQuestions).toBe('boolean');
      expect(typeof result.body.messages).toBe('object');

    });
  });

});
