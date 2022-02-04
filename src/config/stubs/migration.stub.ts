export function up(knex: any): any {
  return knex.schema.createTable('table_name', (table: any) => {
    table.increments('id').primary();

    table.timestamps(true, true);
  });
}

export function down(knex: any): any {
  return knex.schema.dropTable('table_name');
}
