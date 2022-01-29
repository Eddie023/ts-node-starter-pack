import { Knex } from 'knex';
import { Model } from 'objection';

import { getKnexConnection } from './knex';

// Give the knex instance to objection.
Model.knex(getKnexConnection());

class BaseModel extends Model {
  public static connection?: Knex;

  /**
   * @returns {Knex}
   */
  public static getConnection(): Knex {
    return getKnexConnection()
  }
}

export default BaseModel
