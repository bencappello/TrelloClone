TrelloClone.Collections.Boards = Backbone.Collection.extend ({
  url: 'api/boards',

  template: JST['boards/index'],

  model: TrelloClone.Models.Board,

  render: function () {
    this.$el.html(this.template({boards: this.models}));
    return this;
  }
})
