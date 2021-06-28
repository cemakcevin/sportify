function sortCommentsAscending(comments) {

    comments.sort((comment1, comment2) => comment1.timestamp - comment2.timestamp)

    return comments;
}

module.exports = sortCommentsAscending;