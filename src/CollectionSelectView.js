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

    addAll: function(collection, options) {
        CollectionView.prototype.addAll.call(this, collection, options);
        this.addEmptyOption();
    },

    addEmptyOption: function() {
        if (this.addEmpty) {
            var $option = $('<option />');
            $option.html(this.addEmpty);
            $option.val('');
            
            this.$('option').each(function() {
                $(this).prop('selected', false);
            });

            $option.prop('selected', true);
            this.$el.prepend($option);
        }
    },

    render: function() {
        CollectionView.prototype.render.call(this);
        this.addEmptyOption();

        return this;
    },

    callChangeFunction: function(event) {
        this.changeFunction(this.getValue());
    }
});
