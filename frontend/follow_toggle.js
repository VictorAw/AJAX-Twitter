class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    // When using JQuery::data, we have to name the attribute data-<name>
    // and then call .data(<name>)
    // When using JQuery::attr, we can name the attribute <name>
    // and then call .attr(<name>)
    this.userId = this.$el.data("user-id");
    this.followState = this.$el.data("follow-state");
    this.render();
    this.installHandlers();
  }

  render() {
    this.$el.data("follow-state", this.followState);

    if (this.followState === "pending") {
      this.$el.prop("disabled", true);
    }
    else {
      this.$el.prop("disabled", false);
    }

    if (this.followState === "unfollowed") {
      this.$el.html("follow");
    } else {
      this.$el.html("unfollow");
    }
  }

  installHandlers() {
    this.$el.on("click", (evt) => { this.handleClick(evt); });
    //(this.handleClick).bind(this));
  }

  handleClick(evt) {
    evt.preventDefault();
    let requestType = "";
    let newFollowState = "";

    if (this.$el.data("follow-state") === "unfollowed") {
      requestType = "POST";
      newFollowState = "followed";
    }
    else {
      requestType = "DELETE";
      newFollowState = "unfollowed";
    }

    let oldState = this.followState;
    this.followState = "pending";
    this.render();

    $.ajax({
      type: requestType,
      dataType: "json",
      url: `/users/${parseInt($(evt.target).data("user-id"))}/follow`,
      context: this,
      success(data) {
        this.followState = newFollowState;
        this.render();
      },
      error() {
        this.followState = oldState;
        this.render();
      },
    });
  }
}




module.exports = FollowToggle;
