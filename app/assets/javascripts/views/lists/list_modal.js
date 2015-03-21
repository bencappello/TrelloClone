BulletinStack.Views.ListModal = Backbone.CompositeView.extend({
  template: JST['lists/modal'],

  initialize: function (options) {
    this.parent = options.parent;
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click .modal-dismiss': 'dismiss',
    'click .modal-backdrop' : 'dismiss',
    'click #delete-list': 'removeList',
    'click #update-list': 'update',
  },

  dismiss: function (event) {
    event.preventDefault();
    this.remove();
  },

  render: function () {
    var content = this.template({ list: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  update: function (event) {
    event.preventDefault();
    this.model.set({ title: this.$('textarea').val() });
    this.model.save({}, { wait: true });

    this.remove();
  },

  removeList: function (event) {
    event.preventDefault();
    this.model.destroy();
    this.parent.removeSubview('ul#lists', this)

    this.remove();
  },
});
