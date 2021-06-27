const bookshelf = require('../bookshelf');

const Request = bookshelf.model("Request", {
    tableName: "requests",
    idAttribute: 'requestId'
})

module.exports = Request;