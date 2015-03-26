BulletinStack.Views.ItemShow = Backbone.CompositeView.extend ({
  initialize: function (options) {
    this.parent = options.parent;
    this.listenTo(this.model, 'change', this.render);
  },

  tagName: 'div',

  className: 'item-show',

  template: JST['items/show'],

  events: {
  },

  attributes: function() {
  return {
    'data-item-id': this.model.id
  };
},

  render: function () {
    this.$el.html(this.template({item: this.model}))
    return this;
  },

})
