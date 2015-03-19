TrelloClone.Collections.Lists = Backbone.Collection.extend ({
  url: 'api/lists',
  model: TrelloClone.Models.List,
  comparator: 'ord',

  initialize: function (model, options) {
    this.board = options.board;
  },

})
