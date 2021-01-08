const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const { globalAgent } = require('https');


describe('mockingly_instagram routes', () => {
  beforeAll(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('allows a user to signup via POST', async() => {
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

  it('login via POST', async() => { 
    // const user = await UserService.create({
    //   email: 'user@test.com',
    //   password: 'password'
    // });

    const respond = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'user@test.com',
        password: 'password'
      });

    expect(respond.body).toEqual({
      id: expect.any(String),
      email: 'user@test.com',
    });
  });

  it('verfy user', async() => {
    const agent = request.agent(app);
    // const user = await UserService.create({
    //   email: 'user@test.com',
    //   password: 'password'
    // });

    await agent 
      .post('/api/v1/auth/login')
      .send({
        email: 'user@test.com',
        password: 'password'
      });

    const respond = await agent
      .get('/api/v1/auth/verify');

    expect(respond.body).toEqual({
      id: expect.any(String),
      email: 'user@test.com'
    });
  });

  it('POST a gram to the website', async() => {
    const response = await request(app)
    .post('/api/v1/posts')
    .send({
      user_id: "1",
      photo_url: "blaha blah",
      caption: "felt cute might delete later",
      tags: [ { hashtag: "#sorrynotsorry",
                tag:"blessblessbless" } ]
    });

    expect(response.body).toEqual({
      id: "1",
      user_id: "1",
      photo_url: "blaha blah",
      caption: "felt cute might delete later",
      tags: [ { hashtag: "#sorrynotsorry",
                tag:"blessblessbless" } ]

    });

  });


});
