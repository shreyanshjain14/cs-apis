const { timestamps, onUpdateTrigger } = require("../utils");
exports.up = async function (knex) {
  const migration = await knex.schema.createTable("todos", function (table) {
    table.bigIncrements("id");
    table.string("ulid");
    table.string("todoDescription");
    table.tinyint("status");
    table.bigInteger("createdBy");
    timestamps(knex, table);
  });
  await knex.raw(onUpdateTrigger("todos"));
  return migration;
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("todos");
};
