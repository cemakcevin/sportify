const bookshelf = require('../bookshelf');

const Comment = bookshelf.model("Comment", {
    tableName: "comments",
    idAttribute: 'commentId'
})

module.exports = Comment;