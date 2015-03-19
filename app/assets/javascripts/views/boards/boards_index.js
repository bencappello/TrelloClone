TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend ({
  template: JST['boards/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync add delete', this.render)
  },

  render: function () {
    this.$el.html(this.template({boards: this.collection}));
    return this;
  }
})
