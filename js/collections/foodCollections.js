// FoodCollection using firebase to asve the data

	var FoodCollection = Backbone.Firebase.Collection.extend({
		model: Food,
		url: "https://incandescent-fire-5591.firebaseio.com/",

	});







