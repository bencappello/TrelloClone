TrelloClone.Views.ListShow = Backbone.CompositeView.extend ({
  initialize: function (options) {
    this.parent = options.parent;
  },

  tagName: 'li',

  className: 'list-show',

  template: JST['lists/show'],

  events: {
    'click button#delete-list': 'removeList'
  },

  render: function () {
    this.$el.html(this.template({list: this.model}))
    return this;
  },

  removeList: function (event) {
    event.preventDefault();
    this.model.destroy();
    // this.parent.removeSubview('ul#lists', this)
  },

})
