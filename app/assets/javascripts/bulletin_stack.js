window.BulletinStack = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    var $rootEl = $('#main');
    var boards = new BulletinStack.Collections.Boards();
    boards.fetch();

    new BulletinStack.Routers.Router(boards, $rootEl);
    Backbone.history.start();
  }
};

$(document).ready(function(){
  BulletinStack.initialize();
});
