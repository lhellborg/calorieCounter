var SearchableCollection = Backbone.Collection.extend({
		model: Food,
	});

var ham = new Food({
	foodItem: 'Ham',
	calories: 20
});

var butter = new Food({
	foodItem: 'Butter',
	calories: 45
});

var sushi = new Food({
	foodItem: 'Sushi',
	calories: 35
});

var hamster = new Food({
	foodItem: 'Hamster',
	calories: 35
});


