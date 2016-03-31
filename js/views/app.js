// The view for the entire application
var AppView = Backbone.View.extend({
	el: $('#main'),


	initialize: function() {
		_.bindAll(this, "render");
		this.foodCollection = this.collection;
		this.foodCollection.bind("add" , this.render);
		this.render();
	},

	render: function() {
		$('#main').empty(); //empty the view before appending another thing

		var totCalories = 0;
		for (i=0; i<this.foodCollection.length; i++) {
			totCalories += Number(this.foodCollection.models[i].get('calories'));

		}

		$(this.el).append('<h2>Your calorie intake</h2>')
		$(this.el).append('<p>today: ' + totCalories + '</p>')
		$(this.el).append('<h2>Todays food</h2>')
		var ul = $('<ul id="foodList"></ul>');
		this.foodCollection.forEach(function(item) {
			ul.append('<li>' + item.get('foodItem') + '</li>');
		})

		$(this.el).append(ul);

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