import AbstractEndpoints from './abstract_endpoints.js'
export class ExcercieEndpoints extends AbstractEndpoints{
  constructor(app, dataSource){
    this.app = app
  }
  init() {
    this.app.get('/getExcerices', (req, res) => {
      console.log('implement the get excerices')
      res.send({})
    })
  }
}