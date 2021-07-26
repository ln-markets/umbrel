const express = require('express')
const routes = require('@routes')
const path = require('path')
const bodyParser = require('body-parser')

module.exports = async (app) => {
  app.use(require('@middleware/cors.js'))
  app.use(bodyParser.json({ extended: false }))
  app.use(bodyParser.text())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use('/api', routes)

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../front/')))
  }
}
