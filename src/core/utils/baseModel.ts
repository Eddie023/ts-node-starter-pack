import { Knex } from 'knex';
import Objection, { Model, snakeCaseMappers } from 'objection';

import { getKnexConnection } from './knex';

// Give the knex instance to objection.
Model.knex(getKnexConnection());

class BaseModel extends Model {
  public static connection?: Knex;

  /**
   *  This will transform all the `snake_case` columns form db
   *  to `camelCase`. However, you will still define tables, columns and relation  mappings
   *  using `snake_case`.
   */
  public static get columnNameMappers() {
    return snakeCaseMappers();
  }

  /**
   * @returns {Knex}
   */
  public static getConnection(): Knex {
    return getKnexConnection()
  }

  public static async findById(id: number): Promise<BaseModel | Objection.NotFoundError> {
    const result = await this.query().findById(2);

    if (!result) {
      throw new Objection.NotFoundError({
        statusCode: 404,
        message: `Task with id: ${id} not found.`
      })
    }

    return result
  }

  /**
   * Fetch all <Model> value from db.
   *
   * @returns {Promise<BaseModel[]>}
   */
  public static async findAll(): Promise<BaseModel[]> {
    return this.query()
  }
}

export default BaseModel
