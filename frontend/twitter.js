const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search.js");

$(() => {
  let followToggles = [];

  $(".follow-toggle").each ((i, el) => {
    followToggles.push(new FollowToggle(el));
  });

  let usersSearch = [];

  $("nav.users-search").each ((i, el) => {
    usersSearch.push(new UsersSearch(el));
  });
});
