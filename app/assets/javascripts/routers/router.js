BulletinStack.Routers.Router = Backbone.Router.extend ({
  initialize: function (boards, $rootEl) {
    this.boards = boards;
    this.$rootEl = $rootEl;

    var dropDownView = new BulletinStack.Views.DropDownView({
      collection: this.boards
    })
    $('#add-dropdown').append(dropDownView.render().$el);
  },

  routes: {
    '': 'boardIndex',
    'boards': 'boardIndex',
    'boards/:id': 'boardShow'
  },

  boardIndex: function () {
    var view = new BulletinStack.Views.BoardsIndex({ collection: this.boards });
    this._swapView(view);
  },

  boardShow: function (id) {
    var board = this.boards.getOrFetch(id);
    var view = new BulletinStack.Views.BoardShow({model: board});
    this._swapView(view);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    // TODO: Save jQuery object for #main to instance variable in initialize.
    this.$rootEl.html(view.render().$el);
  }
})
