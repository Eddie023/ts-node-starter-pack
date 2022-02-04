export function up(knex: any): any {
  return knex.schema.createTable('todo', (table: any) => {
    table.increments('id').primary();

    table.string('title', 255).notNullable();
    table.string('description', 255);

    table.timestamps(true, true);
  });
}

export function down(knex: any): any {
  return knex.schema.dropTable('todo');
}
