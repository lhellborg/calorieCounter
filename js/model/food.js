

var Food = Backbone.Model.extend({
	defaults: {
		foodItem: '',
		calories: 0
	}
});

var ham = new Food({
	foodItem: 'Ham',
	calories: 20
});

var butter = new Food({
	foodItem: 'Butter',
	calories: 45
})

alert(ham.get('foodItem'));


