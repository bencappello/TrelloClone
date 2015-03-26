BulletinStack.Views.ItemForm = Backbone.LinkFormView.extend({
  formTemplate: JST['items/form'],
  linkTemplate: JST['items/form_link'],
  className: 'item-form-container',

  events: {
    'click a': 'showForm',
    'click .close': 'hideForm',
    'submit' : 'create',
    'click .btn-success' : 'create',
    'keydown textarea': 'maybeCreate'
  },

  initialize: function (options) {
    this.parentView = options.parentView;
  },

  create: function (event) {
    event.preventDefault();

    var newItem = this.collection.create({
      title: this.$('textarea').val(),
      card_id: this.collection.card.id
    }, { wait: true });
    this.parentView.addItem(newItem);

    this.$('textarea').val('');
    this.$('textarea').focus();
  },

});
