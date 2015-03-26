BulletinStack.Views.ListShow = Backbone.CompositeView.extend ({
  initialize: function (options) {
    this.parent = options.parent;
    this.collection = this.model.cards();
    this.listenTo(this.model.cards(), 'add remove', this.render);
    this.listenTo(this.model, 'change', this.render);
  },

  tagName: 'li',

  className: 'list-show',

  template: JST['lists/show'],

  orderOptions: {
    modelElement: '.card-show',
    modelName: 'card',
    subviewContainer: 'ul#cards'
  },

  events: {
    'sortreceive': 'receiveCard',
    'sortremove': 'removeCard',
    'sortstop': 'saveCards',
    'click #edit-list': 'showModal',
  },

  attributes: function() {
    return {
      'data-list-id': this.model.id
    };
  },

  render: function () {
    this.$el.html(this.template({list: this.model}))
    this.showCards();
    this.renderFooter();
    this.$(".sort-cards" ).sortable({
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
    var showCardView = new BulletinStack.Views.CardShow({model: card, list: this});
    this.addSubview('ul#cards', showCardView);
  },


  showCards: function () {
    var view = this;
    this.model.cards().each(this.addCard.bind(this));
  },

  renderFooter: function () {
    var formView = new BulletinStack.Views.CardForm({
      collection: this.model.cards()
    });
    this.addSubview('.list-footer', formView);
  },

  receiveCard: function(event, ui) {
    var $cardDisplay = ui.item,
        cardId = $cardDisplay.data('card-id'),
        newOrd = $cardDisplay.index();
    var cardClone = new BulletinStack.Models.Card({
      id: cardId,
      list_id: this.model.id,
      ord: newOrd
    });
    cardClone.save();
    this.model.cards().add(cardClone, {silent: true});
    this.saveCards(event);
  },

  removeCard: function(event, ui) {
    var $cardDisplay = ui.item,
        cardId = $cardDisplay.data('card-id'),
        cards = this.model.cards(),
        cardToRemove = cards.get(cardId),
        cardSubviews = this.subviews('ul#cards');
    cards.remove(cardToRemove);

    var subviewToRemove = _.findWhere(cardSubviews, {model: cardToRemove});
    cardSubviews.splice(cardSubviews.indexOf(subviewToRemove), 1);
    this.saveCards(event);
  },

  saveCards: function(event) {
    event.stopPropagation(); // Prevent list sorting listener from firing.
    this.saveOrds();
  },

  showModal: function () {
  this.modalView = new BulletinStack.Views.ListModal({
    model: this.model,
    parent: this.parent
  });
  $('body').prepend(this.modalView.render().$el);
  this.modalView.delegateEvents();
},

});

_.extend(BulletinStack.Views.ListShow.prototype, BulletinStack.Utils.OrdView);
