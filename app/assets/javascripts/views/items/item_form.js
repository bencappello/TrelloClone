BulletinStack.Views.ItemForm = Backbone.LinkFormView.extend({
  formTemplate: JST['items/form'],
  linkTemplate: JST['items/form_link'],
  className: 'item-form-container',

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

  render: function () {
    var content;
    if(this.formShowing) {
      content = this.formTemplate();
    } else {
      content = this.linkTemplate();
    }

    this.$el.html(content);
    this.delegateEvents();
    return this;
  }
});
