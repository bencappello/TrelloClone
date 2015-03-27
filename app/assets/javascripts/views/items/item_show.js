BulletinStack.Views.ItemShow = Backbone.CompositeView.extend ({
  initialize: function (options) {
    this.parent = options.parent;
    this.listenTo(this.model, 'change', this.render);
  },

  tagName: 'div',

  className: 'item-show group',

  template: JST['items/show'],

  events: {
    'click .item-done': 'toggleDone',
    'click #delete-item': 'deleteItem',
  },

  attributes: function() {
    return {
      'data-item-id': this.model.id
    };
  },

  toggleDone: function () {
    this.model.set('done', !this.model.get('done'));
    this.model.save();
  },

  render: function () {
    this.$el.html(this.template({item: this.model}))
    return this;
  },

  deleteItem: function (event) {
    event.preventDefault();
    this.model.destroy();
    this.parent.removeSubview('#items', this);
    this.parent.saveOrds();

    this.dismiss();
  },

})
