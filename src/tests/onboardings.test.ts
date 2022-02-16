
import mongoose, { disconnect, connect } from 'mongoose';
import request from 'supertest';
import App from '../app';
import OnboardingRoute from '../routes/onboarding.route';
import { dbConnection } from '../databases';
import { Seeder } from 'mongo-seeding';
import path from 'path';
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

describe('Testing Onboardings', () => {

  describe('[GET] /onboarding', () => {
    it('response getRandomOnboarding', async () => {
      const onboardingRoute = new OnboardingRoute();
      const app = new App([onboardingRoute]);
      const result = await request(app.getServer()).get(`${onboardingRoute.path}onboarding`).expect(200);
      expect(typeof result.body.title).toBe('string');
      expect(typeof result.body.answers).toBe('object');
    });
  });

});
