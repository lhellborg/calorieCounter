// A view for an individual food item
var FoodView = Backbone.View.extend({
	el:  $('#userInput'),

	events: {
      'click button#addItem': 'addItem',
      'keyup input#food': 'search',
    },

	initialize: function() {
		_.bindAll(this, 'render', 'addItem', 'search');

		this.foodCollection = this.collection;

	},

	render: function() {
			$('#showSearch').empty();
			var ul = $('<ul id="foodFilter"></ul>');
			$('#showSearch').append(ul);
			var that = this;
			this.searchableCollection.forEach(function(item) {
				ul.append(new FoodEntryView({model: item, collection: that.foodCollection}).render());
			})
	},

	search: function() {
		var searchstring = $('#food').val(); //the input string

		var posting = $.post('https://api.nutritionix.com/v1_1/search' , {
			 "appId":"38be9a6b",
			 "appKey":"7f1e5364fc8d5c22bfa241fd43987a29",
			 "query": searchstring
		});
		this.searchableCollection = new SearchableCollection();

		var that = this;
		posting.done(function(data) {

		 	data.hits.forEach(function(item) {
		 		that.searchableCollection.add({
		 			foodItem: item.fields.item_name,
		 			calories: 40
		 		});
		 	});
		 	that.render();
		});
	},


	// addItem(): Custom function called via click event above.
    addItem: function(event){
		var food = $('#food').val();
		var calories = $('#calories').val();
		var item = new Food({
			foodItem: food,
			calories: calories
		});
		this.foodCollection.add(item); // add item to collection; view is updated via event 'add'

    }
});

var FoodEntryView = Backbone.View.extend({
	tagName: 'li',

	events: {
		'click': 'selectItem'
	},
	initialize: function() {
		_.bindAll(this, 'render', 'selectItem')
	},
	render: function() {
		return this.$el.append(this.model.get("foodItem"));
	},
	selectItem: function() {
		var item = new Food({
			foodItem: this.model.get('foodItem'),
			calories: this.model.get('calories')
		});
		this.collection.add(item);
	}

});