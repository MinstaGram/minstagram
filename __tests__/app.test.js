const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const { globalAgent } = require('https');


describe('mockingly_instagram routes', () => {
  const agent = request.agent(app);
  var user;

  beforeAll(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });


  it('allows a user to signup via POST', async () => {
    user = await request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'user@test.com', password: 'password' })

    expect(user.body).toEqual({
      id: expect.any(String),
      email: 'user@test.com'
    });
  });

  it('login via POST', async () => {

    const respond = await agent
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


  it('verfy user', async () => {

    const respond = await agent
      .get('/api/v1/auth/verify');

    expect(respond.body).toEqual({
      id: expect.any(String),
      email: 'user@test.com'
    });
  });

  it('POST a gram to the website', async () => {

    const response = await agent
      .post('/api/v1/posts')
      .send({
        userId: user.body.id,
        photoUrl: "blaha blah",
        caption: "felt cute might delete later",
        tags: ['sorrynotsorry', 'blessblessbless']

      });

    expect(response.body).toEqual({
      userId: user.body.id,
      photoUrl: "blaha blah",
      caption: "felt cute might delete later",
      tags: ['sorrynotsorry', 'blessblessbless']
    });

  });

  it('POST a comment to our post', async () => {

    const response = await agent
      .post('/api/v1/comments')
      .send({
        commentBy: 1,
        postId: 1,
        comment: "I'm here for this"
      });

    expect(response.body).toEqual({
      id: '1',
      commentBy: '1',
      postId: '1',
      comment: "I'm here for this"
    })

  })


  it('Get all grams from the website', async () => {

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'user@test.com',
        password: 'password'
      });

    const response = await agent
      .get('/api/v1/posts/')

    expect(response.body).toEqual([{
      userId: "1",
      photoUrl: "blaha blah",
      caption: "felt cute might delete later",
      tags: ['sorrynotsorry', 'blessblessbless']
    }])
  });


  it('Get a gram from the website', async () => {

    const response = await agent
      .get('/api/v1/posts/1')

    expect(response.body).toEqual({
      userId: "1",
      photoUrl: "blaha blah",
      caption: "felt cute might delete later",
      tags: ['sorrynotsorry', 'blessblessbless'],
      comments: [{
        id: 1,
        postId: 1,
        comment: "I'm here for this",
        commentBy: 1
      }]
    })
  });

  it('Updates a gram on website', async () => {

    const response = await agent
      .put('/api/v1/posts/1')
      .send({
        userId: user.body.id,
        photoUrl: "blaha blah blah blah",
        caption: "felt cute might delete later, nah",
        tags: ['#sorrynotsorry', '#blessblessbless']
      })

    expect(response.body).toEqual({
      userId: user.body.id,
      photoUrl: "blaha blah blah blah",
      caption: "felt cute might delete later, nah",
      tags: ['#sorrynotsorry', '#blessblessbless']
    })
  });

  it('DELETE a comment from a post', async () => {

    const response = await agent
      .delete('/api/v1/comments/1')

    expect(response.body).toEqual({
      id: '1',
      commentBy: '1',
      postId: '1',
      comment: "I'm here for this"
    })

  })

  it('DELETE a post', async () => {

    const response = await agent
      .delete('/api/v1/posts/1')

    expect(response.body).toEqual({
      userId: user.body.id,
      photoUrl: "blaha blah blah blah",
      caption: "felt cute might delete later, nah",
      tags: ['#sorrynotsorry', '#blessblessbless']
    })

  })

});
