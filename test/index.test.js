require('dotenv').config()
const { describe, before, after, it } = require('mocha')
const { expect } = require('chai')
const request = require('request')
const createApp = require('../create-app')

describe('Continuous Delivery', () => {
  const app = createApp()
  let server

  before(done => {
    server = app.listen(process.env.PORT, () => {
      done()
    })
  })

  after(done => {
    server.close(() => {
      done()
    })
  })

  describe('Get /', () => {
    it('Should return a status 200', done => {
      request('http://localhost:' + process.env.PORT, (err, response, body) => {
        expect(err).to.equal(null)
        expect(response.statusCode).to.equal(200)
        done()
      })
    })
    it('Should return an object with then name continuous-delivery and a desciption', done => {
      request(
        { url: 'http://localhost:' + process.env.PORT, json: true },
        (err, response, body) => {
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
        { url: 'http://localhost:' + process.env.PORT, json: true },
        (err, response, body) => {
          expect(body).to.have.property(
            'url',
            'https://github.com/ryancurrie/continuous-delivery'
          )
          done()
        }
      )
    })
  })
})
