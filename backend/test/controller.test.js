const request = require('supertest');
const app = require('../server')
const appAuth = require('../authserver')


/**
 * ACCOUNT CONTROLLER TEST
 */
describe('Login', () => {
    it('POST /login ---> return access token', (done) => {
       request(appAuth)
           .post('/login')
           .send({username: "midnight2", password: "password"})
           .set('Accept', 'application/json')
           .expect('Content-Type', /json/)
           .expect(200)
           .then(response => {
               expect(response.body.refreshToken).toEqual(expect.any(String))
               done();
           })
           .catch(err => done(err))
    });

    it('POST /login ---> return error message Username or Password is Incorrect when wrong Username', (done) => {
        request(app)
            .post('/login')
            .send({username: "midnight", password: "password"})
            .set('Accept', 'application/json')
            .expect(401)
            .then(response => {
                expect(response.body.message).toEqual("Username or Password is Incorrect")
                done();
            })
            .catch(err => done(err))
    });

    it('POST /login ---> return error message Username or Password is Incorrect when wrong Password', (done) => {
        request(app)
            .post('/login')
            .send({username: "midnight2", password: "password1"})
            .set('Accept', 'application/json')
            .expect(401)
            .then(response => {
                expect(response.body.message).toEqual("Username or Password is Incorrect")
                done();
            })
            .catch(err => done(err))
    });
})


/**
 * USER CONTROLLER TEST
 */
describe('User', () => {

    it('PATCH /user/update/:id ---> return updated user data', (done) => {
        request(app)
            .patch('/user/update/' + "626eb6a37395205dd0f61d5d")
            .send({
                name:"jhumar regaspi55",
                username:"midnight5",
                email:"jhumarregaspim5@gmail.com",
            })
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlkbmlnaHQyIiwiaWQiOiI2MjZjZmNjNWFhODk2YmUzYzE3OTNmMDYiLCJpYXQiOjE2NTE0MjE2NTl9.SavVPmbX5Kr9wlmX-x5DgvkSN_5v2VVeLKEwf7zRbK4')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.name).toEqual(expect.any(String))
                expect(response.body.username).toEqual(expect.any(String))
                expect(response.body.email).toEqual(expect.any(String))
                done();
            })
            .catch(err => done(err))
    })

    it('GET /user/:id ---> return current user own user data', (done) => {
        request(app)
            .get('/user/'  + "626cfcc5aa896be3c1793f06")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlkbmlnaHQyIiwiaWQiOiI2MjZjZmNjNWFhODk2YmUzYzE3OTNmMDYiLCJpYXQiOjE2NTE0MjE2NTl9.SavVPmbX5Kr9wlmX-x5DgvkSN_5v2VVeLKEwf7zRbK4')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

})

/**
 * Blog CONTROLLER TEST
 */
describe('Blog', () => {

    it('GET /blog/all ---> get all blogs', (done) => {
        request(app)
            .get('/blog/all')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlkbmlnaHQyIiwiaWQiOiI2MjZjZmNjNWFhODk2YmUzYzE3OTNmMDYiLCJpYXQiOjE2NTE0MjE2NTl9.SavVPmbX5Kr9wlmX-x5DgvkSN_5v2VVeLKEwf7zRbK4')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('GET /blog/id ---> get blog by id', (done) => {
        request(app)
            .get('/blog/' + "626ceebbf8c535c7dc7c884b")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlkbmlnaHQyIiwiaWQiOiI2MjZjZmNjNWFhODk2YmUzYzE3OTNmMDYiLCJpYXQiOjE2NTE0MjE2NTl9.SavVPmbX5Kr9wlmX-x5DgvkSN_5v2VVeLKEwf7zRbK4')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('POST /blog/add ---> create blog', (done) => {
        request(app)
            .post('/blog/add')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlkbmlnaHQyIiwiaWQiOiI2MjZjZmNjNWFhODk2YmUzYzE3OTNmMDYiLCJpYXQiOjE2NTE0MjE2NTl9.SavVPmbX5Kr9wlmX-x5DgvkSN_5v2VVeLKEwf7zRbK4')
            .set('Accept', 'application/json')
            .send({
                title:"My Blog 2",
                snippet:"sample snippet",
                body:"sample body"
            })
            .expect(201)
            .then(response => {
                done();
            })
            .catch(err => done(err))
    });

    it('PATCH /blog/update/:id ---> update blog', (done) => {
        request(app)
            .patch('/blog/update/' + "626ceebbf8c535c7dc7c884b")
            .send({
                title:"My Blog 2",
                snippet:"sample snippet",
                body:"sample body"
            })
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlkbmlnaHQyIiwiaWQiOiI2MjZjZmNjNWFhODk2YmUzYzE3OTNmMDYiLCJpYXQiOjE2NTE0MjE2NTl9.SavVPmbX5Kr9wlmX-x5DgvkSN_5v2VVeLKEwf7zRbK4')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                done();
            })
            .catch(err => done(err))
    });

})

/**
 * Comment CONTROLLER TEST
 */
describe('Comment', () => {

    it('GET /comment/all/:blogId ---> get all comment', (done) => {
        request(app)
            .get('/comment/all/' + "626ceebbf8c535c7dc7c884b" )
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlkbmlnaHQyIiwiaWQiOiI2MjZjZmNjNWFhODk2YmUzYzE3OTNmMDYiLCJpYXQiOjE2NTE0MjE2NTl9.SavVPmbX5Kr9wlmX-x5DgvkSN_5v2VVeLKEwf7zRbK4')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('GET /comment/id ---> get comment by id', (done) => {
        request(app)
            .get('/comment/' + "626cfa5e48e34c17d0007cf5")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlkbmlnaHQyIiwiaWQiOiI2MjZjZmNjNWFhODk2YmUzYzE3OTNmMDYiLCJpYXQiOjE2NTE0MjE2NTl9.SavVPmbX5Kr9wlmX-x5DgvkSN_5v2VVeLKEwf7zRbK4')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('POST /comment/add ---> create comment', (done) => {
        request(app)
            .post('/comment/add')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlkbmlnaHQyIiwiaWQiOiI2MjZjZmNjNWFhODk2YmUzYzE3OTNmMDYiLCJpYXQiOjE2NTE0MjE2NTl9.SavVPmbX5Kr9wlmX-x5DgvkSN_5v2VVeLKEwf7zRbK4')
            .set('Accept', 'application/json')
            .send({
                comment:"Comment 3",
                blogId:"626ceebbf8c535c7dc7c884b"
            })
            .expect(201)
            .then(response => {
                done();
            })
            .catch(err => done(err))
    });

    it('PATCH /comment/update/:id ---> update comment', (done) => {
        request(app)
            .patch('/comment/update/' + "626cfa5e48e34c17d0007cf5")
            .send({
                comment:"sample body11"
            })
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlkbmlnaHQyIiwiaWQiOiI2MjZjZmNjNWFhODk2YmUzYzE3OTNmMDYiLCJpYXQiOjE2NTE0MjE2NTl9.SavVPmbX5Kr9wlmX-x5DgvkSN_5v2VVeLKEwf7zRbK4')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                done();
            })
            .catch(err => done(err))
    });

})

/**
 * External API (RANDOM FUN FACTS) CONTROLLER TEST
 */
describe('FUN FACTS', () => {

    it('GET /fun/fact ---> get random fun fact', (done) => {
        request(app)
            .get('/fun/fact')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWlkbmlnaHQyIiwiaWQiOiI2MjZjZmNjNWFhODk2YmUzYzE3OTNmMDYiLCJpYXQiOjE2NTE0MjE2NTl9.SavVPmbX5Kr9wlmX-x5DgvkSN_5v2VVeLKEwf7zRbK4')
            .expect(200, done);
    })

})
