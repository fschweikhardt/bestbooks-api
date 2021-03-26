const express = require('express')
const UsersRouter = express.Router()
const bodyParser = express.json()
const UsersService = require('./UsersService')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const { JWT_SECRET } = require('../config')
const logger = require('../logger.js')
//xss

UsersRouter
    .route('/api/test')
    .get((req,res,next) => {
        res.status(200).send("working")
        next()
    })
    .post(bodyParser, (req,res,next) => {
        const { title } = req.body
        res.status(201).send(title)
        next()
    })

UsersRouter
    .route('/api/all-books')
    .get((req,res,next) => {
        //gets all books
        UsersService.allBooks(req.app.get('db'))
            .then(data => {
                res 
                    .status(200)
                    .json(data)
            })
            .catch(next)
    })

UsersRouter
    .route('/api/award-list')
    .post(bodyParser, (req,res,next) => {
        const { award } = req.body
        //gets all books from one award list
        UsersService.allFromAward(req.app.get('db'), award)
            .then(data => {
                res 
                    .status(200)
                    .json(data)
            })
            .catch(next)
    })

UsersRouter
    .route('/api/year-list')
    .post(bodyParser, (req,res,next) => {
        const { year } = req.body
        //gets all books from one year
        UsersService.allFromYear(req.app.get('db'), year)
            .then(data => {
                res 
                    .status(200)
                    .json(data)
            })
            .catch(next)
    })

UsersRouter
    .route('/api/specific-book')
    .post(bodyParser, (req,res,next) => {
        const { award, year } = req.body
        //gets one book from specified list and year
        UsersService.specificBook(req.app.get('db'), award, year)
            .then(data => {
                res 
                    .status(200)
                    .json(data)
            })
            .catch(next)
    })

UsersRouter
    .route('/api/random-book')
    .get((req,res,next) => {
        //gets one book at random
        UsersService.randomBook(req.app.get('db'))
    })


module.exports = UsersRouter