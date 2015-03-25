BulletinStack.Collections.Items = Backbone.Collection.extend ({
  url: 'api/items',
  model: BulletinStack.Models.Item,
  // comparator: 'ord',

  initialize: function (model, options) {
    this.card = options.card;
  },

})
