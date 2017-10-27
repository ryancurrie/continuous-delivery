const { describe, before, after, it } = require('mocha')
const { expect } = require('chai')
const request = require('request')
const createApp = require('../create-app')

describe('Continuous Delivery', () => {
  const app = createApp()
  let server

  before(done => {
    server = app.listen(3000, () => {
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
      request('http://localhost:3000', (err, response, body) => {
        expect(err).to.equal(null)
        expect(response.statusCode).to.equal(200)
        done()
      })
    })
    it('Should return an object with then name continuous-delivery and a desciption', done => {
      request(
        { url: 'http://localhost:3000', json: true },
        (err, response, body) => {
          expect(body)
            .to.be.an('object')
            .that.has.property('name', 'continuous-delivery')
          expect(body).to.have.property('description')
          done()
        }
      )
    })
  })
})
