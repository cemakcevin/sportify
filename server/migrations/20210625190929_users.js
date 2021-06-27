
exports.up = function(knex) {

    return knex.schema
    .createTable("users", (table) => {
        table.string("userId").primary();
        table.string("name").notNullable();
        table.string("lastName").notNullable();
        table.string("userName").notNullable();
        table.string("password").notNullable();
        table.string("description").notNullable();
        table.string("bio").notNullable();
        table.string("location").notNullable();
        table.string("from").notNullable();
        table.string("imgUrl").notNullable();
        table.decimal("timestamp", 65, 0).notNullable();
    })
    .createTable("favourites", (table) => {
        table.string("favouritesId").primary();
        table.string("userId").notNullable();
        table.string("idTeam").notNullable();
        table.string("strTeam").notNullable();
        table.string("strTeamBadge").notNullable();
        table.foreign("userId")
            .references("userId")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    })
    .createTable("feed", (table) => {
        table.string("feedId").primary();
        table.string("userId").notNullable();
        table.string("commentorId").notNullable();
        table.string("contentType").notNullable();
        table.string("commentorName").notNullable();
        table.string("userName").notNullable();
        table.string("imgUrl").notNullable();
        table.string("commentText").notNullable();
        table.decimal("timestamp", 65, 0).notNullable();
        table.string("idEvent");
        table.string("strEvent");
        table.string("intHomeScore");
        table.string("intAwayScore");
        table.string("strVideo");
        table.foreign("userId")
            .references("userId")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    })
    .createTable("friends", (table) => {
        table.string("friendshipId").primary();
        table.string("userId").notNullable();
        table.string("friendId").notNullable();
        table.string("friendName").notNullable();
        table.string("imgUrl").notNullable();
        table.foreign("userId")
            .references("userId")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    })
    .createTable("requests", (table) => {
        table.string("requestId").primary();
        table.string("userId").notNullable();
        table.string("requestorId").notNullable();
        table.string("requestorName").notNullable();
        table.string("imgUrl").notNullable();
        table.foreign("userId")
            .references("userId")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    })
    .createTable("comments", (table) => {
        table.string("commentId").primary();
        table.string("contentId").notNullable();
        table.string("contentType").notNullable();
        table.string("userId").notNullable();
        table.string("name").notNullable();
        table.string("imgUrl").notNullable();
        table.string("commentText").notNullable();
        table.decimal("timestamp", 65, 0).notNullable();
        table.string("receiverId");
        table.foreign("userId")
            .references("userId")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("comments")
        .dropTable("requests")
        .dropTable("friends")
        .dropTable("feed")
        .dropTable("favourites")
        .dropTable("users");
};
