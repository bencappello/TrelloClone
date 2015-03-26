BulletinStack.Views.CardModal = Backbone.CompositeView.extend({
  template: JST['cards/modal'],

  initialize: function (options) {
    this.parent = options.parent;
    // this.listenTo(this.model, 'sync', this.render);
    $('#md-overlay').on('click', this.dismiss.bind(this));
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
    'click .modal-dismiss': 'dismiss',
    'click .md-overlay' : 'dismiss',
    'click #update-list': 'update',
    'click #delete-list': 'deleteCard',
  },

  dismiss: function (event) {
    if (event) {
      event.preventDefault();
    }
    this.remove();
    $('#md-overlay').removeClass('show');
    this.$el.removeClass('md-show');
    // $("body").css("overflow", "auto");
  },

  render: function () {
    // $("body").css("overflow", "hidden");
    var that = this;
    var content = this.template({ card: this.model });
    this.$el.html(content);
    this.model.fetch({
      success: function () {
        that.renderItems();
        that.$el.addClass('md-show');
      }
    });
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
      collection: this.model.items()
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
    this.parent.removeSubview('ul#cards', this)

    this.dismiss();
  },
});
