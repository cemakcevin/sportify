function sortCommentsDescending(comments) {

    comments.sort((comment1, comment2) => comment2.timestamp - comment1.timestamp)

    return comments;
}

module.exports = sortCommentsDescending;