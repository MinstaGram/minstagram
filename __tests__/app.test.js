const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const { createUsers, createPosts, createComments } = require('../testData.js')
const Post = require('../lib/models/Post.js')
const Comment = require('../lib/models/Comment.js')
const User = require('../lib/models/User.js')


describe('tests mockingly_instagram routes', () => {
  const agent = request.agent(app);
  var user;

  beforeAll(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });


  // ------------------------------------------

  it('allows a user to signup via /auth', async () => {
    user = await request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'user@test.com', password: 'password' })

    expect(user.body).toEqual({
      id: expect.any(String),
      email: 'user@test.com'
    });
  });

  // ------------------------------------------

  it('login via /auth', async () => {

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


  // ------------------------------------------

  it('verfy user via /auth', async () => {

    const respond = await agent
      .get('/api/v1/auth/verify');

    expect(respond.body).toEqual({
      id: expect.any(String),
      email: 'user@test.com'
    });
  });

  // ------------------------------------------

  it('inserts a gram via /posts', async () => {

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

  it('inserts a comment via /comments', async () => {

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


  it('returns all grams via /posts', async () => {

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


  it('returns one gram via /posts/:id', async () => {

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

  it('updates a gram via /posts/:id', async () => {

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

  it('deletes a comment via /comments/:id', async () => {

    const response = await agent
      .delete('/api/v1/comments/1')

    expect(response.body).toEqual({
      id: '1',
      commentBy: '1',
      postId: '1',
      comment: "I'm here for this"
    })

  })

  it('deletes a gram via /posts/:id', async () => {

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

describe('mockingly_instagram tests posts/popular', () => {
  const agent = request.agent(app);

  beforeAll(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  beforeAll(async () => {

    const users = createUsers();
    for (let user of users) {
      await User.insert(user)
    }

    const posts = await createPosts();
    for (let post of posts) {
      await Post.insert(post)
    }

    const comments = await createComments();
    for (let comment of comments) {
      await Comment.insert(comment)
    }
  })


  it('test /post/popular', async () => {

    const response = await agent
      .get('/api/v1/posts/popular')

    expect(response.body).toEqual([
      {
        userId: '10',
        photoUrl: '{www.10.com}',
        caption: 'picture of 10 + 10',
        tags: ['#blessed', '#nofilter']
      },
      {
        userId: '9',
        photoUrl: '{www.10.com}',
        caption: 'picture of 9 + 10',
        tags: ['#blessed', '#nofilter']
      },
      {
        userId: '9',
        photoUrl: '{www.9.com}',
        caption: 'picture of 9 + 9',
        tags: ['#blessed', '#nofilter']
      },
      {
        userId: '8',
        photoUrl: '{www.10.com}',
        caption: 'picture of 8 + 10',
        tags: ['#blessed', '#nofilter']
      },
      {
        userId: '8',
        photoUrl: '{www.9.com}',
        caption: 'picture of 8 + 9',
        tags: ['#blessed', '#nofilter']
      },
      {
        userId: '8',
        photoUrl: '{www.8.com}',
        caption: 'picture of 8 + 8',
        tags: ['#blessed', '#nofilter']
      },
      {
        userId: '7',
        photoUrl: '{www.10.com}',
        caption: 'picture of 7 + 10',
        tags: ['#blessed', '#nofilter']
      },
      {
        userId: '7',
        photoUrl: '{www.9.com}',
        caption: 'picture of 7 + 9',
        tags: ['#blessed', '#nofilter']
      },
      {
        userId: '7',
        photoUrl: '{www.8.com}',
        caption: 'picture of 7 + 8',
        tags: ['#blessed', '#nofilter']
      },
      {
        userId: '7',
        photoUrl: '{www.7.com}',
        caption: 'picture of 7 + 7',
        tags: ['#blessed', '#nofilter']
      }
    ]);
  });

});
