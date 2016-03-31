// A view for an individual food item
var FoodView = Backbone.View.extend({
	el:  $('#userInput'),

	events: {
      'click button#addItem': 'addItem'
    },

	initialize: function() {
		_.bindAll(this, 'render', 'addItem');

		this.foodCollection = this.collection;
		this.render();
	},
	render: function() {
		alert("Add a food item")
	},

	// addItem(): Custom function called via click event above.
    addItem: function(){
		var food = $('#food').val();
		var calories = $('#calories').val();
		var item = new Food({
			foodItem: food,
			calories: calories
		});
		this.foodCollection.add(item); // add item to collection; view is updated via event 'add'

    }
});