
exports.up = function(knex) {

    return knex.schema
    .createTable("users", (table) => {
        table.string("userId").primary();
        table.string("name").notNullable();
        table.string("lastName").notNullable();
        table.string("password").notNullable();
        table.string("description").notNullable();
        table.string("bio").notNullable();
        table.string("location").notNullable();
        table.string("from").notNullable();
        table.string("imgUrl").notNullable();
        table.timestamp("timestamp").defaultTo(knex.fn.now());
    })
    .createTable("favourites", (table) => {
        table.string("favouritesId").primary();
        table
            .string("userId")
            .notNullable()
            .references("userId")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.string("idTeam").notNullable();
        table.string("strTeam").notNullable();
        table.string("strTeamBadge").notNullable();
    })
};

exports.down = function(knex) {

};
