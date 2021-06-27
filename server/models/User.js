const bookshelf = require("../bookshelf");

const User = bookshelf.model("User", {
    tableName: "users",
    idAttribute: 'userId'
})

module.exports = User;