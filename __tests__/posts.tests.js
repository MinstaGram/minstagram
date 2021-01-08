// const request = require('supertest');
// const app = require('../lib/app');
// const pool = require('../lib/utils/pool');
// const fs = require('fs');


// describe('gram routes', () => {
//   beforeEach(() => {
//     return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
//   });
//   afterAll(() => {
//     return pool.end();
//   });

//   it('POST a gram to the website', async() => {
//     const response = await request(app)
//     .post('/api/v1/posts')
//     .send({
//       user_id: "1",
//       photo_url: "blaha blah",
//       caption: "felt cute might delete later",
//       tags: [ { hashtag: "#sorrynotsorry",
//                 tag:"blessblessbless" } ]
//     });

//     expect(response.body).toEqual({
//       id: "1",
//       user_id: "1",
//       photo_url: "blaha blah",
//       caption: "felt cute might delete later",
//       tags: [ { hashtag: "#sorrynotsorry",
//                 tag:"blessblessbless" } ]

//     });

//     });
// });
