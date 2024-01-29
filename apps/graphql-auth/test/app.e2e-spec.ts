import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';


describe('GraphqlAuthController (e2e)', () => {
  let app: INestApplication;

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
