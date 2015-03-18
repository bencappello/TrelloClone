TrelloClone.Views.ListShow = Backbone.CompositeView.extend ({
  initialize: function (options) {
    this.parent = options.parent;
    this.listenTo(this.model.cards(), 'add remove', this.render);
  },

  tagName: 'li',

  className: 'list-show',

  template: JST['lists/show'],

  events: {
    'click button#delete-list': 'removeList'
  },

  render: function () {
    this.$el.html(this.template({list: this.model}))
    this.showCards();
    this.newCardFormOrButton();
    this.$el.find(".sort-cards" ).sortable({
      connectWith: ".connectable",
      placeholder: "card-place-holder"
    }).disableSelection();
    return this;
  },

  addCard: function (card) {
    var showCardView = new TrelloClone.Views.CardShow({model: card, parent: this});
    this.addSubview('ul#cards', showCardView);
  },


  showCards: function () {
    var view = this;
    this.model.cards().each(this.addCard.bind(this));
  },

  newCardFormOrButton: function () {
    var newCardView = new TrelloClone.Views.CardNew({list: this.model});
    this.addSubview('section#add-card', newCardView)
  },

  removeList: function (event) {
    event.preventDefault();
    this.model.destroy();
    this.parent.removeSubview('ul#lists', this)
  },

})
