TrelloClone.Views.BoardNew = Backbone.View.extend ({
  template: JST['boards/new'],

  events: {
    'click button.add-board': 'saveBoard'
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  saveBoard: function (event) {
    event.preventDefault;
    var title = $('input.title').val();

    var newBoard = new TrelloClone.Models.Board();
    newBoard.save({title: title}, {
      success: function () {
        this.collection.add(newBoard);
        Backbone.history.navigate('#/api/boards/' + newBoard.id, {trigger: true});
      }.bind(this),
      error: function () {
        $('section.error').html(response.responseJSON);
      }
    });
  }
})
