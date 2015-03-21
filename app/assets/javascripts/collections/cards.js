BulletinStack.Collections.Cards = Backbone.Collection.extend ({
  url: 'api/cards',
  model: BulletinStack.Models.Card,
  comparator: 'ord',

  initialize: function (model, options) {
    this.list = options.list;
  },

})
