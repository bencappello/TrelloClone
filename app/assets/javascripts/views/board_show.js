TrelloClone.Views.BoardShow = Backbone.CompositeView.extend ({
  initialize: function () {
    this.collection = this.model.lists();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'add remove', this.render);
  },

  template: JST['boards/show'],

  events: {

  },

  render: function () {
    this.$el.html(this.template({board: this.model}));
    this.showLists();
    this.newListFormOrButton();
    $( ".sort-lists" ).sortable().disableSelection();
    return this;
  },

  addList: function (list) {
    var showListView = new TrelloClone.Views.ListShow({model: list, parent: this});
    this.addSubview('ul#lists', showListView);
  },

  showLists: function () {
    var view = this;
    this.model.lists().each(this.addList.bind(this));
  },

  newListFormOrButton: function () {
    var newListView = new TrelloClone.Views.ListNew({board: this.model});
    this.addSubview('section#add-list', newListView)
  }


});

_.extend(TrelloClone.Views.BoardShow.prototype, TrelloClone.Utils.OrdView);
