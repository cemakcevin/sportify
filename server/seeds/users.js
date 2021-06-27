const usersData = require('../seedData/seed_users.json');
const favouritesData = require('../seedData/seed_favourites.json');
const feedData = require('../seedData/seed_feed.json');
const friendsData = require('../seedData/seed_friends.json');
const requestsData = require('../seedData/seed_requests.json');
const commentsData = require('../seedData/seed_comments.json');


exports.seed = function(knex) {

  return knex("users").del()
    .then(() => {
      return knex("users").insert(usersData);
    })
    .then(() => {
      knex("favourites").del();
    })
    .then(() => {
      return knex("favourites").insert(favouritesData);
    })
    .then(() => {
      knex("feed").del();
    })
    .then(() => {
      return knex("feed").insert(feedData);
    })
    .then(() => {
      knex("friends").del();
    })
    .then(() => {
      return knex("friends").insert(friendsData)
    })
    .then(() => {
      knex("requests").del();
    })
    .then(() => {
      return knex("requests").insert(requestsData);
    })
    .then(() => {
      knex("comments").del();
    })
    .then(() => {
      return knex("comments").insert(commentsData);
    })

};
