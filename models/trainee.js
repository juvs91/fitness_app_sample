export class Trainee {
  constructor(dataSource){
    this.dataSource = dataSource
  }
  get(id, filters){
    let data = {
      command: 'get',
      Model: 'Trainee',
      args: {
        id,
        filters
      }
    }
    return this.dataSource.execute(data)
  }
  getAll(){}

}