const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const { globalAgent } = require('https');

 
describe('mockingly_instagram routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('allows a user to signup viat POST', async() => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'user@test.com', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          email: 'user@test.com'
        });
      });
  });

});
