const express = require('express')
const UsersRouter = express.Router()
const bodyParser = express.json()
const UsersService = require('./UsersService')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const { JWT_SECRET } = require('../config')
const logger = require('../logger.js')
const { readSync } = require('fs')
//xss

UsersRouter
    .route('/test')
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
    .route('/all-books')
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
    .route('/award-list')
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
    .route('/year-list')
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
    .route('/specific-book')
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
    .route('/random-book')
    .get((req,res,next) => {
        //get random number based off db length
        UsersService.dbLength(req.app.get('db'))
            .then(data => {
                //get db length
                let dbLength = Number(Object.values(data[0]))
                //get random number 
                const randomId = Math.floor((Math.random() * dbLength) + 1)
                UsersService.getRandomBook(req.app.get('db'), randomId)
                    .then( book => {
                        res
                            .status(200)
                            .json(book)
                    })
                    .catch(next)

            })
            .catch(next)
    })


module.exports = UsersRouter