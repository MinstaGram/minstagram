
const createUsers = () => {
    let userArray = [];
    for (let i = 1; i < 11; i++) {
        userArray.push({
            email: `user${i}@test.com`,
            passwordHash: 'password'
        })
    }
    return userArray
}

const createPosts = () => {
    let postArray = [];
    for (let i = 1; i < 11; i++) {

        for (let j = i; j < 11; j++) {
            postArray.push({
                userId: i,
                photoUrl: `{www.${j}.com}`,
                caption: `picture of ${i}`,
                tags: ['#blessed', '#nofilter']
            })
        }
    }
    return postArray;
}

const createComments = () => {
    let commentArray = [];

    for (let i = 1; i < 11; i++) {
        for (let j = 1; j < 55; j++) {
            for (let k = j; k < 25; k++) {
                commentArray.push({
                    commentBy: i,
                    postId: j,
                    comment: `representing ${i}`
                })
            }
        }
    }
    return commentArray;
}

module.exports = { createUsers, createPosts, createComments }
