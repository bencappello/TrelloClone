window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    $rootEl = $('#main');
    
    TrelloClone.boards = new TrelloClone.Collections.Boards();
    TrelloClone.boards.fetch();


  }
};

$(document).ready(function(){
  TrelloClone.initialize();
});
