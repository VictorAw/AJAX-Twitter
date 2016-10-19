const FollowToggle = require("./follow_toggle.js");

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    let navChildren = $(this.$el.children());
    this.$input = navChildren.eq(0);
    this.$ul = navChildren.eq(1);
    this.$input.on("input", (e) => this.handleInput(e) );
  }

  handleInput(e) {
    if (e.target.value === "*") {
      e.target.value = ".*";
    }

    $.ajax({
      type: "GET",
      dataType: "json",
      url: `/users/search`,
      context: this,
      data: {query: e.target.value},
      success(users) {
        this.renderResults(users);
      }
    });
  }

  _constructLink(el, parent) {
    let $li = $("<li></li>");
    $li.html(`<a href="/users/${el.id}">${el.username}</a>`);
    parent.append($li);

    this._constructButton(el, $li);
  }

  _constructButton(el, parent) {
    let followedString = el.followed ? "followed" : "unfollowed";
    // Could use helper options hash for FollowToglge constructor
    // See exercise instructions Phase II for more details
    let $followButton = $(`<button class="follow-toggle"
                          data-user-id="${el.id}"
                          data-follow-state="${followedString}"></button>`);
    new FollowToggle($followButton);
    parent.append($followButton);
  }

  renderResults(users) {
    let $usersList = $(".users");
    $usersList.empty();

    users.forEach ((user) => {
      this._constructLink(user, $usersList);
    });
  }

  clearInput() {
    $("nav.users-search input").val("");
  }
}


module.exports = UsersSearch;
