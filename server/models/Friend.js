const bookshelf = require('../bookshelf');

const Friend = bookshelf.model("Friend", {
    tableName: "friends",
    idAttribute: "friendshipId"
})

module.exports = Friend;