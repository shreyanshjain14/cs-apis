const { timestamps, onUpdateTrigger } = require("../utils");
exports.up = async function (knex) {
  const migration = await knex.schema.createTable("post_comments", function (table) {
    table.bigIncrements("id");
    table.string("ulid");
    table.string("description");
    table.tinyint("status"); //active inactive
    table.bigInteger("createdBy");
    timestamps(knex, table);
  });
  await knex.raw(onUpdateTrigger("post_comments"));
  return migration;
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("post_comments");
};
