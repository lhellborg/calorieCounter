

	// var FoodCollection = Backbone.Firebase.Collection.extend({
	// 	model: Food,
	// 	url: "https://incandescent-fire-5591.firebaseio.com/",

	// });

var FoodCollection = Backbone.Collection.extend({
		model: Food,
	});

var foodCollection = new FoodCollection();

foodCollection.add(butter);

alert(foodCollection.get(butter).get('foodItem'))

