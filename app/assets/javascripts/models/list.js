BulletinStack.Models.List = Backbone.Model.extend ({
  urlRoot: 'api/lists',

  cards: function () {
    if (!this._cards) {
      this._cards = new BulletinStack.Collections.Cards([], {list: this});
    }
    return this._cards;
  },

  parse: function (resp) {
    
    if (resp.cards) {
      this.cards().set(resp.cards, {parse: true});
      delete resp.cards;
    }
    return resp;
  }
})
