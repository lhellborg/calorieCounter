// The view for the entire application
var AppView = Backbone.View.extend({
	el: $('#main'), //the HTML element used for the app view

	events: {
		'click #remove': 'removeAll',
		'click #removeLast': 'removeLast'
	},


	initialize: function() {
		_.bindAll(this, 'render', 'removeAll', 'removeLast');
		this.foodCollection = this.collection;
		this.foodCollection.bind("add" , this.render);//add asynchronous data retieval
		this.render();
		},

	render: function() {
		$('#summary').empty(); //empty the view before appending another thing

		var totCalories = 0;
		for (i=0; i<this.foodCollection.length; i++) {
			totCalories += Number(this.foodCollection.models[i].get('calories'));

		}

		this.$('#summary').append('<h2>Your calorie intake</h2>');
		this.$('#summary').append('<h4>Total: ' + totCalories + '</h4>');
		this.$('#summary').append('<div class="foodItems" </div>');
		this.$('.foodItems').append('<h2 class="left">Food items</h2>');
		this.$('.foodItems').append('<button id="remove" class="remove">Remove all</button>');
		this.$('.foodItems').append('<button id="removeLast" class="removeLast">Remove last</button>');
		var ul = $('<ul id="foodList"></ul>');
		this.foodCollection.forEach(function(item) {
			ul.append('<li>' + item.get('foodItem') + ', cal: ' + item.get('calories') + '</li>');
		});

		this.$('#summary').append(ul);

	},

	removeAll: function() { //take away all food items in the list
		var model;

		while (model = this.foodCollection.first()) {
		    model.destroy();
		}
		this.render();
		$('#food').val("").focus(); //cursor in the input field
	},

	removeLast: function() { //take away the last item from the list
		var model = this.foodCollection;
		if (model.last() !== undefined) {
			model.last().destroy();
			this.render();
		}
		$('#food').val("").focus();//cursor in the input field
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