import AbstractEndpoints from './abstract_endpoints.js'
import Trainee from '../models/trainee.js'
export class TraineeEndpoints extends AbstractEndpoints{
  constructor(app, dataSource){
    this.app = app
    this.traineModel = new Trainee(dataSource)
  }
  init() {
    this.app.get('/getTrainee', (req, res) => {
        console.log("ruta cero")
        res.send({})
    })
  }

}