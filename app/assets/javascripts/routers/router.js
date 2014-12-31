TrelloClone.Routers.Router = Backbone.Router.extend ({
  initialize: function (boards, $rootEl) {
    this.boards = boards;
    this.$rootEl = $rootEl;
  },

  routes: {
    'api/boards': 'boardIndex',
    'api/boards/new': 'boardNew',
    'api/boards/:id': 'boardShow'
  },

  boardIndex: function () {
    var view = new TrelloClone.Views.BoardsIndex({ collection: this.boards });
    this.$rootEl.html(view.render().$el);
  },

  boardNew: function () {
    var view = new TrelloClone.Views.BoardNew({collection: this.boards});
    this.$rootEl.html(view.render().$el);
  },

  boardShow: function (id) {
    var board = this.boards.getOrFetch(id);
    var view = new TrelloClone.Views.BoardShow({model: board});
    this.$rootEl.html(view.render().$el);
  }
})
