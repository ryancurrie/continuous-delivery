require('dotenv').config()
const { describe, before, after, it } = require('mocha')
const { expect } = require('chai')
const { MongoClient } = require('mongodb')
const request = require('request')
const createApp = require('../server/create-app')

describe('Continuous Delivery', () => {
  let app
  let server
  let db

  before(done => {
    MongoClient.connect(process.env.MONGODB_URI, (err, _db) => {
      if (err) {
        done(err)
      }
      db = _db
      app = createApp(db)
      server = app.listen(process.env.PORT, () => {
        done()
      })
    })
  })

  after(done => {
    server.close(() => {
      db.close()
      done()
    })
  })

  describe('Get /', () => {
    it('Should return a status 200', done => {
      request(
        'http://localhost:' + process.env.PORT + '/api',
        (err, response, body) => {
          expect(err).to.equal(null)
          expect(response.statusCode).to.equal(200)
          done()
        }
      )
    })
    it('Should return an object with then name continuous-delivery and a desciption', done => {
      request(
        { url: 'http://localhost:' + process.env.PORT + '/api', json: true },
        (err, response, body) => {
          expect(err).to.equal(null)
          expect(body)
            .to.be.an('object')
            .that.has.property('name', 'continuous-delivery')
          expect(body).to.have.property('description')
          done()
        }
      )
    })
    it('Should return a link to the git hub repository', done => {
      request(
        { url: 'http://localhost:' + process.env.PORT + '/api', json: true },
        (err, response, body) => {
          expect(err).to.equal(null)
          expect(body).to.have.property(
            'url',
            'https://github.com/ryancurrie/continuous-delivery'
          )
          done()
        }
      )
    })
  })

  describe('/todos', () => {
    it('should return a list of todos', done => {
      request(
        {
          url: 'http://localhost:' + process.env.PORT + '/api/todos',
          json: true
        },
        (err, response, body) => {
          expect(err).to.equal(null)
          expect(body).to.be.an('array')
          done()
        }
      )
    })
  })

  describe('/create', () => {
    it('should create a new item and return the item and status 201', done => {
      const options = {
        method: 'post',
        body: { task: 'test', dueDate: new Date() },
        json: true,
        url: 'http://localhost:' + process.env.PORT + '/api/create'
      }
      request(options, (err, httpResponse, body) => {
        expect(err).to.equal(null)
        expect(body)
          .to.be.an('object')
          .that.has.property('id')
        expect(httpResponse)
          .to.be.an('object')
          .that.has.property('statusCode', 201)
        done()
      })
    })
  })
})
