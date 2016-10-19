const FollowToggle = require("./follow_toggle.js");
$(() => {
  let followToggles = [];

  $(".follow-toggle").each ((i, el) => {
    followToggles.push(new FollowToggle(el));
  });
});
