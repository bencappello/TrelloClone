BulletinStack.Views.BoardNew = Backbone.CompositeView.extend ({
  template: JST['boards/new'],

  events: {
    'click button.add-board': 'saveBoard'
  },

  render: function (error) {
    this.$el.html(this.template());
    if (error) {
      this.$el.find('section.error').html(error);
    }
    return this;
  },

  saveBoard: function (event) {
    event.preventDefault();
    var title = $('input.title').val();

    var newBoard = new BulletinStack.Models.Board();
    newBoard.save({title: title}, {
      success: function () {
        this.collection.add(newBoard);
        Backbone.history.navigate('#/api/boards/' + newBoard.id, {trigger: true});
      }.bind(this),
      error: function (model, resp) {
        this.render(resp.responseJSON);
      }.bind(this)
    });
  }
})
