BulletinStack.Views.BoardShow = Backbone.CompositeView.extend ({
  initialize: function () {
    this.collection = this.model.lists();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'add remove', this.render);
  },

  template: JST['boards/show'],

  events: {
    'sortstop': 'saveOrds',
  },

  orderOptions: {
    modelElement: '.list-show',
    modelName: 'list',
    subviewContainer: 'ul#lists'
  },

  render: function () {
    this.$el.html(this.template({board: this.model}));
    this.showLists();
    this.renderListForm();
    $( ".sort-lists" ).sortable().disableSelection();
    return this;
  },

  addList: function (list) {
    var showListView = new BulletinStack.Views.ListShow({model: list, parent: this});
    this.addSubview('ul#lists', showListView);
  },

  showLists: function () {
    var view = this;
    this.model.lists().each(this.addList.bind(this));
  },

  renderListForm: function () {
    var view = new BulletinStack.Views.ListForm({
      collection: this.collection
    });
    this.addSubview('#list-form', view);
  },

});

_.extend(BulletinStack.Views.BoardShow.prototype, BulletinStack.Utils.OrdView);
