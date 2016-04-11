// The view for the entire application
var AppView = Backbone.View.extend({
	el: $('#main'),

	events: {
		'click #remove': 'removeAll'
	},


	initialize: function() {
		_.bindAll(this, 'render', 'removeAll');
		this.foodCollection = this.collection;
		this.foodCollection.bind("add" , this.render);
		this.render();
		},

	render: function() {
		$('#summary').empty(); //empty the view before appending another thing

		var totCalories = 0;
		for (i=0; i<this.foodCollection.length; i++) {
			totCalories += Number(this.foodCollection.models[i].get('calories'));

		}

		this.$('#summary').append('<h2>Your calorie intake</h2>');
		this.$('#summary').append('<p>total: ' + totCalories + '</p>');
		this.$('#summary').append('<h3>Food items</h3>');
		var ul = $('<ul id="foodList"></ul>');
		this.foodCollection.forEach(function(item) {
			ul.append('<li>' + item.get('foodItem') + ', cal: ' + item.get('calories') + '</li>');
		});

		this.$('#summary').append(ul);

	},

	removeAll: function() {
		var model;

		while (model = this.foodCollection.first()) {
		    model.destroy();
		}
		this.render();
	}

});


// Create a function to kick off our BackboneFire app
function init() {
  // The data we are syncing from our remote Firebase database
  var collection = new FoodCollection();
  var app = new AppView({ collection: collection });
  var foodView = new FoodView({ collection: collection });
}


// When the document is ready, call the init function
$(function() {
  init();

});