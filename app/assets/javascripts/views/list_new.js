TrelloClone.Views.ListNew = Backbone.CompositeView.extend ({
  template: JST['lists/new'],

  events: {
    'click button#add-list': 'addList',
    'click button#save-list': 'saveList'
  },

  initialize: function (options) {
    this.board = options.board;
  },

  render: function (form, error) {
    if (form) {
      this.$el.html(this.template({form: true}));
    } else {
      this.$el.html(this.template({form: false}));
    }

    if (error) {
      this.$el.find('section.error').html(error);
    }

    return this;
  },

  addList: function () {
    this.render(true);
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
        this.render(form, resp.responseJSON);
      }.bind(this)
    })
  }
})
