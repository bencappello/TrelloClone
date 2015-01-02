TrelloClone.Views.ListShow = Backbone.CompositeView.extend ({
  tagName: 'li',

  className: 'list-show',

  template: JST['lists/show'],

  render: function () {
    this.$el.html(this.template({list: this.model}))
    return this;
  }
})
