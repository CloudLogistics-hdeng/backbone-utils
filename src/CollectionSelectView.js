var CollectionSelectView = CollectionView.extend({
    tagName: 'select',

    events: {
        "change":    "callChangeFunction"
    },

    parseOptions: function(options) {
        // call super class
        CollectionView.prototype.parseOptions.call(this, options);

        this.addEmpty = options.addEmpty || false;
        this.changeFunction = options.changeFunction || function() {};
    },

    getDefaultItemView: function() {
        return CollectionOptionView;
    },

    getValue: function() {
        return this.$el.val();
    },

    render: function() {
        CollectionView.prototype.render.call(this);

        if (this.addEmpty) {
            var idAttribute = this.collection.model.idAttribute;
            var attrs = {
                selected: true
            };
            attrs[idAttribute] = "";
            this.collection.add([attrs], { at: 0 });
        }

        return this;
    },

    callChangeFunction: function(event) {
        this.changeFunction(this.getValue());
    }
});
