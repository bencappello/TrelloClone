BulletinStack.Views.CardModal = Backbone.CompositeView.extend({
  template: JST['cards/modal'],

  initialize: function (options) {
    this.model.fetch();
    this.list = options.list;
    $('#md-overlay').on('click', this.dismiss.bind(this));
    this.listenTo(this.model, 'sync', this.postFetchRendering.bind(this));
  },

  tagName: 'div',

  className: 'modal-form card-modal',

  orderOptions: {
    modelElement: '.item-show',
    modelName: 'item',
    subviewContainer: '#items'
  },

  events: {
    'sortstop': 'saveOrds',
    'click .md-close': 'dismiss',
    'click #update-list': 'update',
    'click #delete-list': 'deleteCard',
  },

  dismiss: function (event) {
    var $target = $(event.target);
    if (event) {
      event.preventDefault();
      debugger
      if (!$target.hasClass('md-close')) {
        return;
      }
    }
    this.remove();
    $('#md-overlay').removeClass('show');
    this.$el.removeClass('md-show');
    $('#md-overlay').off();
  },

  postFetchRendering: function() {
    this.renderItems();
    this.$el.addClass('md-show');
    this.collection = this.model.items();
  },

  render: function () {
    var that = this;
    var content = this.template({ card: this.model });
    this.$el.html(content);
    this.renderItemForm();
    $('#md-overlay').addClass('show');
    $( ".sort-items" ).sortable({
      placeholder: "item-place-holder",
      start: function(e, ui ){
        ui.placeholder.height(ui.helper.outerHeight());
        ui.placeholder.width(ui.helper.outerWidth());
      }
    }).disableSelection();
    return this;
  },

  addItem: function (item) {
    var showItemView = new BulletinStack.Views.ItemShow({model: item, parent: this});
    this.addSubview('#items', showItemView);
  },

  renderItems: function() {
    this.model.items().each(this.addItem.bind(this));
  },

  renderItemForm: function () {
    var formView = new BulletinStack.Views.ItemForm({
      collection: this.model.items(),
      parentView: this
    });
    this.addSubview('#item-form', formView);
  },

  update: function (event) {
    event.preventDefault();
    this.model.set({ title: this.$('textarea').val() });
    this.model.save({}, { wait: true });

    this.dismiss();
  },

  deleteCard: function (event) {
    event.preventDefault();
    this.model.destroy();
    this.list.removeSubview('ul#cards', this)

    this.dismiss();
  },
});

_.extend(BulletinStack.Views.CardModal.prototype, BulletinStack.Utils.OrdView);
