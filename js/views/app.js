// The view for the entire application
var AppView = Backbone.View.extend({
	el: $('body'),

	events: {
		"click #add-food": "createFood"
	},

	initialize: function() {
		this.listenTo(this.collection, 'add', this.addFood);
	},

	addFood: function(food) {
		var view = new FoodView({model: food});
		//add calories to calorie intake
	},

	createFood: function(e) {
		if (!this.input.val()) {
			return;
		}

		// create a new location in firebase and save the model data
	    // this will trigger the listenTo method above and a new todo view
	    // will be created as well
	    this.collection.create({foodItem: this.input.val()});

	    this.input.val('');
	},
});

// Create a function to kick off our BackboneFire app
function init() {
  // The data we are syncing from our remote Firebase database
  var collection = new FoodCollection();
  var app = new AppView({ collection: collection });
}


// When the document is ready, call the init function
$(function() {
  init();

});