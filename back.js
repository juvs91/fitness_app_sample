// const express = require('express')
import express from 'express'
import cors from 'cors'
import TraineeEndpoints from './routes/trainee_endpoints.js'
import ExcercieEndpoints from './routes/excerice_endpoints.js'
import RouterInit from './routes/index.js'
import MongoDataSource from './data_sources/mongo_data_source.js'
export class Back {
  constructor(){}
  init () {
    let app = express()
    app.use(cors())
    app.use(bodyParser.urlencoded({
      extended: true
    }))
    // app.use((req, res, next) => {
    //   console.log("in the middleware")
    //   next()
    // })
    app.use(bodyParser.json())
    let rounterInit = new RouterInit(app, 
                                     [TraineeEndpoints, ExcercieEndpoints], 
                                     new MongoDataSource());
    rounterInit.init()
  }
}

