TrelloClone.Models.List = Backbone.Model.extend ({

  cards: function () {
    if (!this._cards) {
      this._cards = new TrelloClone.collections.Cards([], {list: this});
    }
    return this._cards;
  },

  parse: function (resp) {
    if (resp.cards) {
      this._cards.set(resp.cards, {parse: true});
      delete resp.cards;
    }
    return resp;
  }
})
