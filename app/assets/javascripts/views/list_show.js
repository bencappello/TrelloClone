TrelloClone.Views.ListShow = Backbone.CompositeView.extend ({
  initialize: function (options) {
    this.parent = options.parent;
    this.listenTo(this.model.cards(), 'add remove', this.render);
  },

  tagName: 'li',

  className: 'list-show',

  template: JST['lists/show'],

  events: {
    'click button#delete-list': 'removeList',
    'sortreceive': 'receiveCard',
    'sortremove': 'removeCard',
    'sortstop': 'saveCards'
  },

  render: function () {
    this.$el.html(this.template({list: this.model}))
    this.showCards();
    this.newCardFormOrButton();
    this.$el.find(".sort-cards" ).sortable({
      connectWith: ".connectable",
      placeholder: "card-place-holder",
      start: function(e, ui ){
        ui.placeholder.height(ui.helper.outerHeight());
        ui.placeholder.width(ui.helper.outerWidth());
      }
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

  receiveCard: function(event, ui) {
    var $cardDisplay = ui.item,
        cardId = $cardDisplay.data('card-id'),
        newOrd = $cardDisplay.index();
    var cardClone = new TrelloClone.Models.Card({
      id: cardId,
      list_id: this.model.id,
      ord: newOrd
    });
    cardClone.save();
    this.collection.add(cardClone, {silent: true});
    this.saveCards(event);
  },

  removeCard: function(event, ui) {
    var $cardDisplay = ui.item,
        cardId = $cardDisplay.data('card-id'),
        cards = this.model.cards(),
        cardToRemove = cards.get(cardId),
        cardSubviews = this.subviews('.list-cards');
    cards.remove(cardToRemove);

    var subviewToRemove = _.findWhere(cardSubviews, {model: cardToRemove});
    cardSubviews.splice(cardSubviews.indexOf(subviewToRemove), 1);
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
