import { Knex } from 'knex';

/**
 * Create new table <table_name>.
 *
 * @param  {Knex} knex
 * @returns {PromisePromise<Knex.SchemaBuilder>}
 */
export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('table_name', (t) => {
    t.increments('id').primary();

    t.timestamps(true, true);
  });
}

/**
 * Rollback migration. Drop table <table_name>.
 *
 * @param  {Knex} knex
 * @returns {PromisePromise<Knex.SchemaBuilder>}
 */
export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('table_name');
}
