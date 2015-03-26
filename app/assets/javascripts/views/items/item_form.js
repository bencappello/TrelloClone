BulletinStack.Views.ItemForm = Backbone.LinkFormView.extend({
  formTemplate: JST['items/form'],
  linkTemplate: JST['items/form_link'],
  className: 'item-form-container',

  create: function (event) {
    event.preventDefault();

    this.collection.create({
      title: this.$('textarea').val(),
      card_id: this.collection.card.id
    }, { wait: true });

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
