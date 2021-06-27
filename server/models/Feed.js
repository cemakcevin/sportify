const bookshelf = require('../bookshelf');

const Feed = bookshelf.model("Feed", {
    tableName: "feed",
    idAttribute: 'feedId'
})

module.exports = Feed;