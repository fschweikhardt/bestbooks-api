const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../src/app')
const { makeBooksArray } = require('./book-fixtures.js')
const knex = require('knex')
//const { TEST_DATABASE_URL} =  require('../src/config')

const TOKEN = 123456789

describe('endpoints db connection', function() {
    let db
    before('make knex instance', () => {
        db = knex({
            client: 'pg', 
            connection: 'postgres://postgres:postgres@localhost:5432/bestbooks'
        })
      app.set('db', db)
    })
    after('disconnect from db', () => db.destroy())
    before('clean the table', () => db.raw('TRUNCATE books_table RESTART IDENTITY CASCADE'))
    afterEach('cleanup', () => db.raw('TRUNCATE books_table RESTART IDENTITY CASCADE'))
})


//.set('Authorization', 'Bearer ' + TOKEN)

// describe('GET /', () => {
//     it('respond with Hello, Best Books!', () => {
//         return supertest(app)
//             .get('/')
//             .expect('Hello, Best Books!')
//             .expect(200);
//     })
// })

// describe('GET seed data', () => {
//     it('responds with award list', () => {
//         return supertest(app)
//             .get('/api/get-awards')
//             .set('Authorization', 'Bearer ' + TOKEN)
//             //.expect(???)
//             .expect(200)
//     })
//     it('responds with year list', () => {
//         return supertest(app)
//             .get('/api/get-years')
//             .set('Authorization', 'Bearer ' + TOKEN)
//             //.expect(???)
//             .expect(200)
//     })
// })

// describe('POST book search query res', () => {
//     it('responds with the books from an award', () => {
//         return supertest(app)
//             .get('/api/award-list')
//             .set('Authorization', 'Bearer ' + TOKEN)
//             ///.expect(???)
//             .expect(200)
//     })
//     it('responds with the books from a year', () => {
//         return supertest(app)
//             .get('/api/year-list')
//             .set('Authorization', 'Bearer ' + TOKEN)
//             ///.expect(???)
//             .expect(200)
//     })
//     it('responds with the books from an award and year', () => {
//         return supertest(app)
//             .get('/api/specific-book')
//             .set('Authorization', 'Bearer ' + TOKEN)
//             ///.expect(???)
//             .expect(200)
//     })
//     it('responds with a random book from the db', () => {
//         return supertest(app)
//             .get('/api/random-book')
//             .set('Authorization', 'Bearer ' + TOKEN)
//             ///.expect(???)
//             .expect(200)
//     })
// })

// describe.skip('POST login', () => {
//     it('should respond with JWT token', () => {
//         return supertest(app)
//             .post('/api/login')
//             .send({
//                 username: "demo",
//                 password: "demo"
//             })
//             .expect(200)
//     })
//     it('should fail with incorrect password', () => {
//         return supertest(app)
//             .post('/api/login')
//             .send({
//                 username: "demo",
//                 password: "bad"
//             })
//             .expect(401)
//     })
// })

// describe('POST /api/verify routes', () => {
//     let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbW8iLCJpYXQiOjE2MTQwOTY3Mzh9.M6eWaIVMMsBSwa1zS6ySNx56aZks-OiBQiRnDVD6AYA'
//     it('verifyId, should return 200', () => {
//         return supertest(app)
//             .get('/api/verifyId')
//             .set('Authorization', 'Bearer ' + token)
//             .expect(200)
//     })
//     it('verifyLists, should return 200', () => {
//         return supertest(app)
//             .get('/api/verifyId')
//             .set('Authorization', 'Bearer ' + token)
//             .expect(200)
//     })
//     it('verifyItems, should return 200', () => {
//         return supertest(app)
//             .get('/api/verifyId')
//             .set('Authorization', 'Bearer ' + token)
//             .expect(200)
//     })
// })

//---> 1 DESCRIBE - GET <--//
describe('1 - GET /api/endpoints', () => {
    //1A - CONTEXT to endpoint - given no data in the db
        // context('1A Given bad endpoint', () => {
        //     it('responds with 404 not found', () => {
        //     return supertest(app)
        //         .get('/not-an-endpoint')
        //         .set('Authorization', 'Bearer ' + TOKEN)
        //         .expect(404)
        // })
        // context('1A Given no test data', () => {
        //     it('responds with 200 and an empty list', () => {
        //       return supertest(app)
        //         .get('/api/get-awards')
        //         .set('Authorization', 'Bearer ' + TOKEN)
        //         .expect(200, [])
        //     })
        // })
        context('1A GET random book', () => {
            it('responds with one json object', () => {
                return supertest(app)
                    .get('/api/test')
                    //.set('Authorization', 'Bearer' + 123456789)
                    .expect(200)
            })
        })
        
     })
//})

//     //1B - CONTEXT to people endpoint - given there is data in the db
//       context('1B Given there is testData in the database', () => {
//         const DataTest = makeTestDataArray()
//         beforeEach('insert testData', () => {
//           return db
//             .into('books_table')
//             .insert(DataTest)
//             .then(() => {
//               return db
//             })
//         })
  
//         it('responds with 200 and all of the testData', () => {
//           return supertest(app)
//           .get('/api/testEndpoint')
//           .expect(200, DataTest)
//         })
//       })
//     })
  
//   //---> 2 DESCRIBE - test data by id <--//    
//   describe(`2 - GET /api/data/:data_id`, () => {
//     //2A CONTEXT - data by id - given no dataid in db
//         context(`2A Given no data`, () => {
//           it(`responds with 404`, () => {
//             const data_id = 123456
//             return supertest(app)
//               .get(`/api/data/${data_id}`)
//               .expect(404, { error: { message: `${data_id} not found` } })
//            })
//         })
//   //2B CONTEXT - to data by id - given there is the data by id in db
//     context('2B Given there is data in the database', () => {
//       const DataTest = makeTestDataArray()
  
//       beforeEach('insert data', () => {
//         return db
//           .into('table')
//           .insert(DataTest)
//           .then(() => {
//             return db
//           })
//         })
        
//       it('responds with 200 and the specified data', () => {
//         const dataId = 2
//         const expectedData = testDataTest[dataId - 1]
//         return supertest(app)
//           .get(`/api/people/${dataId}`)
//           .expect(200, expectedData)
//         })
//       })
//     })
//   //---> 3 DESCRIBE - POST data by id  <--// 
//     describe(`3 - POST /api/data`, () => {
//       it(`creates a new obj, responding with 201 and the new obj`,  function() {
//         this.retries(3)
//         const newPerson = {
//           test_name: 'New Person FN',
//           date: new Date('2000-01-31').toISOString()
//         }
//       return supertest(app)
//         .post('/api/test')
//         .send(newPerson)
//         .expect(201)
//         .expect(res => {
//           expect(res.body.test_name).to.eql(newPerson.test_name)
//           expect(res.body.date).to.eql(newPerson.date)
//           expect(res.body).to.have.property('id')
//           expect(res.headers.location).to.eql(`/api/test/${res.body.id}`)
//         })
//         .then(postRes =>
//           supertest(app)
//           .get(`/api/test/${postRes.body.id}`)
//           .expect(postRes.body)
//         )
//       })
  
//       const requiredFields = ['test_name', 'date']
  
//       requiredFields.forEach(field => {
//       const newPerson = {
//         test_name: 'New Person FN',
//         date: new Date('2000-01-31')
//       }
  
//       it(`responds with 400 and an error message when the '${field}' is missing`, () => {
//         delete newPerson[field]
  
//         return supertest(app)
//           .post('/api/test')
//           .send(newPerson)
//           .expect(400, {
//             error: { message: `Missing '${field}' in request body` }
//           })
//         })
//       })
//     })
  
//   //---> 4 DESCRIBE - DELETE date by id <--// 
//     describe(`4 DELETE /api/test/:data_id`, () => {
//       //4A CONTEXT - given there is no data by id to delete
//       context(`4A Given no data`, () => {
//         it(`responds with 404`, () => {
//           const data_Id = 123456
//           return supertest(app)
//             .delete(`/api/data/${data_Id}`)
//             .expect(404, { error: { message: `data not found` } })
//           })
//         })
//       //4B CONTEXT - given there is data by id to delete
//       context('4B Given there is data in the database', () => {
//         const testDataTest = makeTestDataArray()
    
//         beforeEach('insert data', () => {
//           return db
//             .into('table')
//             .insert(testDataTest)
//             .then(() => {
//               return db
//             })
//           })
        
//           it('responds with 204 and removes the data', () => {
//             const idToRemove = 2
//             const expectedData = testData.filter(data => data.id !== idToRemove)
//             return supertest(app)
//               .delete(`/api/test/${idToRemove}`)
//               .expect(204)
//               .then(res =>
//                 supertest(app)
//                   .get(`/api/test`)
//                   .expect(expectedPeople)
//               )
//           })
//         })
//       })
//   //---> 5 DESCRIBE - PATCH data by id <--//
//     describe(`5 - PATCH /api/test/:data_id`, () => {
//       //5A CONTEXT given there is no by id
//       context(`5A Given no data`, () => {
//         it(`responds with 404`, () => {
//           const dataId = 123456
//           return supertest(app)
//             .patch(`/api/test/${testId}`)
//             .expect(404, { error: { message: `data not found` } })
//         })
//       })
//       //5B CONTEXT given there is data in the database
//       context('5B Given there are people in the database', () => {
//         const testDataTest = makeTestDataArray()
          
//         beforeEach('insert data', () => {
//           return db
//             .into('table')
//             .insert(testDataTest)
//             .then (() => {
//               return db
//             })
//         })
          
//         it('responds with 204 and updates the data', () => {
//           const idToUpdate = 2
//           const updateData = {
//             test_name: 'updated person name',
//             data: new Date('1975-09-25').toISOString()
//           }
//           const expectedPerson = {
//             ...testDataTest[idToUpdate - 1],
//             ...updateData
//           }
//           return supertest(app)
//             .patch(`/api/test/${idToUpdate}`)
//             .send(updateData)
//             .expect(204)
//             .then(res =>
//               supertest(app)
//                 .get(`/api/test/${idToUpdate}`)
//                 .expect(expectedData)
//               )
//           })
//         it(`responds with 400 when no required fields supplied`, () => {
//           const idToUpdate = 2
//           return supertest(app)
//             .patch(`/api/test/${idToUpdate}`)
//             .send({ irrelevantField: 'foo' })
//             .expect(400, {
//               error: {
//                 message: `Request body must contain either 'test_name' or 'date'.`
//               }
//             })
//         })
//         it(`responds with 204 when updating only a subset of fields`, () => {
//           const idToUpdate = 2
//           const updateData = {
//             test_name: 'updated first name',
//           }
//           const expectedPerson = {
//             ...testDataTest[idToUpdate - 1],
//             ...updateData
//           }
    
//           return supertest(app)
//             .patch(`/api/people/${idToUpdate}`)
//             .send({
//               ...updateData,
//                 fieldToIgnore: 'should not be in GET response'
//             })
//             .expect(204)
//             .then(res =>
//               supertest(app)
//                 .get(`/api/test/${idToUpdate}`)
//                 .expect(expectedData)
//           )
//         })
//       })
//     })
//   })