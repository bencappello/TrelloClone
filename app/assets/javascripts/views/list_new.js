TrelloClone.Views.ListNew = Backbone.CompositeView.extend ({
  template: JST['lists/new'],

  events: {
    'click button.save-list': 'saveList'
  },

  initialize: function (options) {
    this.board = options.board;
  },

  render: function (error) {
    this.$el.html(this.template());
    if (error) {
      this.$el.find('section.error').html(error);
    }
    return this;
  },

  saveList: function (event) {
    event.preventDefault();
    var title = this.$el.find('input.title').val();
    var data = {
      title: title,
      board_id: this.board.id
    };
    var newList = new TrelloClone.Models.List();

    newList.save(data, {
      success: function () {
        this.board.lists().add(newList)
      }.bind(this),
      error: function () {
        this.render(resp.responseJSON);
      }.bind(this)
    })
  }
})
