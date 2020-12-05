import AbstractEndpoints from './abstract_endpoints.js'
export class RouterInit extends AbstractEndpoints{
  constructor(app, endpoints, dataSource) {
    this.app = app
    this.endpoints = endpoints
    this.dataSource = dataSource
  }
  init(){
    this.endpoints.map(Endpoint => {
      let endpoint = new Endpoint(this.app, this.dataSource)
      endpoint.init()
    })
  }
}