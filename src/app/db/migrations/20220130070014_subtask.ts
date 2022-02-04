export function up(knex: any): any {
  return knex.schema.createTable('subtask', (table: any) => {
    table.increments('id').primary();

    table.timestamps(true, true);
  });
}

export function down(knex: any): any {
  return knex.schema.dropTable('subtask');
}
