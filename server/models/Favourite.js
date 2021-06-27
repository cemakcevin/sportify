const bookshelf = require('../bookshelf');

const Favourite = bookshelf.model("Favourite", {
    tableName: "favourites",
    idAttribute: 'favouritesId'
})

module.exports = Favourite;