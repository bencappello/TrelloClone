TrelloClone.Collections.Lists = Backbone.Collection.extend ({
  initialize: function (model, options) {
    this.board = options.board;
  },

  model: TrelloClone.Models.List,

})
