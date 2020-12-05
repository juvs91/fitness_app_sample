import DataSource from './data_source.js'
import {
  MONGO_DB_URL,
  MONGO_DB_USER,
  MONGO_DB_PASS
} from '../confs.js'

let get_mongoose_connection = () => {
  return mongoose.connect(MONGO_DB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    auth: {
      "authSource": "admin"
    },
    user: MONGO_DB_USER,
    pass: MONGO_DB_PASS
  })
}

export class MongoDataSource extends DataSource{
  constructor(mongoose) {
    if (!mongoose) {
      this.mongoosePromise = get_mongoose_connection()
    }
  }
  execute({command, Model, args}){
    this.ModelPromise = this.mongoosePromise.then(actual_connection => {
      let model_schema = new actual_connection.Schema( { name: String }, { strict: false })
      return Promise.resolve(actual_connection.model(Model, model_schema))
    })
    return this[`_${command}`](ModelPromise, args)
  }
  _get(ModelPromise, {id, filter}) {
    let query = Object.assign({}, {_id: id}, filter)
    return ModelPromise.then(Task => {
      return Task.findOne(query)
    })
  }

  _getAll(ModelPromise, {filter}) {
    return ModelPromise.then(Task => {
      return Task.find(filter)    
    })
  }

  _update(ModelPromise, {id, data}) {
    return ModelPromise.then(Task => {
      return Task.updateOne({_id: id}, data)
    })
  }
  _create(ModelPromise, {data}) {
    return ModelPromise.then(Task => {
      return Task(data).save()
    })
  }

  _delete(ModelPromise, {id, filter}){
    let query = Object.assign({}, {_id: id}, filter)
    return ModelPromise.then(Task => {
      return Task(data).deleteOne(query)
    })
  }

  _join(_) {
    throw new Error('needs to implement it');
  }
}