const supertest = require('supertest')
const app = require('../src/app')
const knex = require('knex')
const { TEST_DATABASE_URL} =  require('../src/config')
const { makeBooksArray } = require('./book-fixtures.js')

const TOKEN = 123456789

describe('Best Books endpoints', () => {
    let db
    
    before('make knex instance', () => {
        db = knex({
            client: 'pg', 
            connection: TEST_DATABASE_URL
        })
      app.set('db', db)
    })
    after('disconnect from db', () => db.destroy())
    before('clean the table', () => db.raw('TRUNCATE books_table RESTART IDENTITY CASCADE'))
    afterEach('cleanup', () => db.raw('TRUNCATE books_table RESTART IDENTITY CASCADE'))

    //---> 1 DESCRIBE - GET ENDPOINTS <--//
    describe('1 - GET /api/endpoints', () => {
        context('1A - given bad endpoint with no auth', () => {
            it('responds with 401 no auth', () => {
                return supertest(app)
                .get('/not-an-endpoint')
                .expect(401)
            })
        })
        context('1B - given bad endpoint with auth', () => {
            it('responds with 404 not found', () => {
                return supertest(app)
                .get('/not-an-endpoint')
                .set('Authorization', 'Bearer ' + TOKEN)
                .expect(404)
            })
        })
        context('1C - given no test data with no auth', () => {
            it('responds with 401 no auth', () => {
                return supertest(app)
                .get('/api/get-awards')
                .expect(401)
            })
        })
        context('1D - given no awards data with auth', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                .get('/api/get-awards')
                .set('Authorization', 'Bearer ' + TOKEN)
                .expect(200, [])
            })
        })
        context('1F - given award data', () => {
            let BooksData = makeBooksArray()
            beforeEach('insert BooksData', () => {
                return db
                    .into('books_table')
                    .insert(BooksData)
                    .then(() => {
                    return db
                })
            })
            it('responds with 200', () => {
                return supertest(app)
                    .get('/api/get-awards')
                    .set('Authorization', 'Bearer ' + TOKEN)
                    .expect(200)
                    .expect(res => {
                        expect(res.body[0]).to.have.property('award')
                    })
            })
        })
        context('1G - given no year data with auth', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                .get('/api/get-years')
                .set('Authorization', 'Bearer ' + TOKEN)
                .expect(200, [])
            })
        })
        context('1H - given year data', () => {
            let BooksData = makeBooksArray()
            beforeEach('insert BooksData', () => {
                return db
                    .into('books_table')
                    .insert(BooksData)
                    .then(() => {
                    return db
                })
            })
            it('responds with 200', () => {
                return supertest(app)
                .get('/api/get-years')
                .set('Authorization', 'Bearer ' + TOKEN)
                .expect(200)
                .expect(res => {
                    expect(res.body[0]).to.have.property('year')
                })
            })
        })
        context('1I - get random book', () => {
            let BooksData = makeBooksArray()
            beforeEach('insert BooksData', () => {
            return db
                .into('books_table')
                .insert(BooksData)
                .then(() => {
                return db
                })
            })
            it('responds with one book', () => {
                return supertest(app)
                    .get('/api/random-book')
                    .set('Authorization', 'Bearer ' + TOKEN)
                    .expect(200)
            })
        })    
    })

    //--> 2 DESCRIBE - POST ENDPOINTS <--//
    describe('2 - POST /api/endpoints', () => {
        context('2A - given award data to POST', () => {
            it('responds with 200', () => {
            return supertest(app)
                .post('/api/award-list')
                .set('Authorization', 'Bearer ' + TOKEN)
                .send({
                    award: "The Booker Prize"
                })
                .expect(200)
            })
        })
        context('2B - given year data to POST', () => {
            it('responds with 200', () => {
            return supertest(app)
                .post('/api/year-list')
                .set('Authorization', 'Bearer ' + TOKEN)
                .send({
                    year: 2000
                })
                .expect(200)
            })
        })
        context('2C - given award and year data to POST', () => {
            let BooksData = makeBooksArray()
            beforeEach('insert BooksData', () => {
                return db
                    .into('books_table')
                    .insert(BooksData)
                    .then(() => {
                    return db
                })
            })
            it('responds with 200', () => {
            return supertest(app)
                .post('/api/specific-book')
                .set('Authorization', 'Bearer ' + TOKEN)
                .send({
                    award: "The Booker Prize",
                    year: 2020,
                })
                .expect(200)
            })
        })
    })
})

//.expect(res => {
    //           expect(res.body.test_name).to.eql(newPerson.test_name)
    //           expect(res.body.date).to.eql(newPerson.date)
    //           expect(res.body).to.have.property('id')
    //           expect(res.headers.location).to.eql(`/api/test/${res.body.id}`)