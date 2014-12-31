TrelloClone.Views.BoardShow = Backbone.CompositeView.extend ({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'add', this.render);
  },

  template: JST['boards/show'],

  events: {
    'click button.add-list': 'addList'
  },

  render: function () {
    this.$el.html(this.template({board: this.model}))
    // this.attachSubviews();
    return this;
  },

  addList: function () {
    var newListView = new TrelloClone.Views.ListNew({board: this.model});
    // this.addSubview('section.add-list', newListView)
    this.$el.find('section.add-list').html(newListView.render().$el);
  },


})
