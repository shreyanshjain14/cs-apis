const { timestamps, onUpdateTrigger } = require("../utils");
exports.up = async function (knex) {
  const migration = await knex.schema.createTable("comments", function (table) {
    table.bigIncrements("id");
    table.string("ulid");
    table.bigInteger("postId");
    table.bigInteger("commentId");
    timestamps(knex, table);
  });
  await knex.raw(onUpdateTrigger("comments"));
  return migration;
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("comments");
};
