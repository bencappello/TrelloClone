BulletinStack.Views.ListModal = Backbone.CompositeView.extend({
  template: JST['lists/modal'],

  initialize: function (options) {
    this.parent = options.parent;
    // this.listenTo(this.model, 'sync', this.render);
    $('#md-overlay').on('click', this.dismiss.bind(this));
  },

  tagName: 'div',

  className: 'modal-form list-modal',

  events: {
    'click .modal-dismiss': 'dismiss',
    'click .md-overlay' : 'dismiss',
    'click #update-list': 'update',
    'click #delete-list': 'deleteList',
  },

  dismiss: function (event) {
    if (event) {
      event.preventDefault();
    }
    this.remove();
    $('#md-overlay').removeClass('show');
    $("body").css("overflow", "auto");
  },

  render: function () {
    $("body").css("overflow", "hidden");
    var content = this.template({ list: this.model });
    this.$el.html(content);
    this.attachSubviews();
    $('#md-overlay').addClass('show');
    this.$el.addClass('md-show');
    return this;
  },

  update: function (event) {
    event.preventDefault();
    this.model.set({ title: this.$('textarea').val() });
    this.model.save({}, { wait: true });

    this.dismiss();
  },

  deleteList: function (event) {
    event.preventDefault();
    this.model.destroy();
    this.parent.removeSubview('ul#lists', this)

    this.dismiss();
  },
});
