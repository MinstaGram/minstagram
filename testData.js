const TOTAL_USERS = 11;
const TOTAL_POSTS = 55;
const COMMENTS_PER_POST = 25;

const createUsers = () => {
    let userArray = [];

    for (let i = 1; i < TOTAL_USERS; i++) {
        userArray.push({
            email: `user${i}@test.com`,
            passwordHash: 'password'
        })
    }
    return userArray
}

const createPosts = () => {
    let postArray = [];

    for (let i = 1; i < TOTAL_USERS; i++) {
        for (let j = i; j < TOTAL_POSTS; j++) {
            postArray.push({
                userId: i,
                photoUrl: `{www.${j}.com}`,
                caption: `picture of ${i} + ${j}`,
                tags: ['#blessed', '#nofilter']
            })
        }
    }
    return postArray;
}

const createComments = () => {
    let commentArray = [];

    for (let i = 1; i < TOTAL_USERS; i++) {
        for (let j = 1; j < TOTAL_POSTS; j++) {
            for (let k = j; k < COMMENTS_PER_POST; k++) {
                commentArray.push({
                    commentBy: i,
                    postId: j,
                    comment: `representing ${i} ${j} ${k}`
                })
            }
        }
    }
    return commentArray;
}

module.exports = { createUsers, createPosts, createComments }
