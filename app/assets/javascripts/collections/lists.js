BulletinStack.Collections.Lists = Backbone.Collection.extend ({
  url: 'api/lists',
  model: BulletinStack.Models.List,
  comparator: 'ord',

  initialize: function (model, options) {
    this.board = options.board;
  },

})
