TrelloClone.Collections.Cards = Backbone.Collection.extend ({
  url: 'api/cards',
  model: TrelloClone.Models.Card,
  comparator: 'ord',

  initialize: function (model, options) {
    this.list = options.list;
  },

})
