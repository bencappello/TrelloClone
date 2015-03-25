BulletinStack.Views.CardModal = Backbone.CompositeView.extend({
  template: JST['cards/modal'],

  initialize: function (options) {
    this.parent = options.parent;
    // this.model.fetch();
    // this.listenTo(this.model, 'sync', this.render);
    $('#md-overlay').on('click', this.dismiss.bind(this));
  },

  tagName: 'div',

  className: 'modal-form card-modal',

  events: {
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
  },

  render: function () {
    var that = this;
    var content = this.template({ card: this.model });
    this.$el.html(content);
    this.attachSubviews();
    $('#md-overlay').addClass('show');
    var i = setTimeout(function() {
      that.$el.addClass('md-show');
    }, 1);
    return this;
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
