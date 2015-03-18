TrelloClone.Views.CardNew = Backbone.CompositeView.extend ({
  template: JST['cards/new'],

  events: {
    'click button#add-card': 'addCard',
    'click button#save-card': 'saveCard'
  },

  initialize: function (options) {
    this.list = options.list;
  },

  render: function (form, error) {
    if (form) {
      this.$el.html(this.template({form: true}));
    } else {
      this.$el.html(this.template({form: false}));
    }

    if (error) {
      this.$el.find('section.error').html(error);
    }
    return this;
  },

  addCard: function () {
    this.render(true);
  },

  saveCard: function (event) {
    event.preventDefault();
    var title = this.$el.find('input.title').val();
    var data = {
      title: title,
      list_id: this.list.id
    };
    var newCard = new TrelloClone.Models.Card();
    newCard.save(data, {
      success: function () {
        this.list.cards().add(newCard)
        debugger
      }.bind(this),
      error: function () {
        this.render(form, resp.responseJSON);
      }.bind(this)
    })
  }
})
