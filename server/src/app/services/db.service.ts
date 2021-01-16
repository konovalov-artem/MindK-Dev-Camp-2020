import * as Knex from 'knex'
import { Model } from 'objection'
import { configService } from './config.service'

export class DBService {
  readonly knex: Knex

  constructor() {
    this.knex = Knex(configService.get<Knex.Config>('db.knex'))
    Model.knex(this.knex)
  }
}
