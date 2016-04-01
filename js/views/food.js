// A view for an individual food item
var FoodView = Backbone.View.extend({
	el:  $('#userInput'),

	events: {
      'click button#addItem': 'addItem',
      'keyup input#food': 'search'
    },

	initialize: function() {
		_.bindAll(this, 'render', 'addItem', 'search');

		this.foodCollection = this.collection;
		this.searchableCollection = new SearchableCollection;
		this.searchableCollection.add(ham);
		this.searchableCollection.add(butter);
		this.searchableCollection.add(sushi);
		this.searchableCollection.add(hamster);
		this.render();
	},

	render: function() {
		alert("Add a food item")
	},

	search: function() {
		var searchstring = $('#food').val(); //the input string
		var regExp = new RegExp(searchstring, "i")
		var selected = []
		this.searchableCollection.forEach(function(item) {
			var string = item.get('foodItem') //a food item
			var res = string.search(regExp); //an insensitive search
			if (res !== -1) {
				selected.push(item);
			}
		});
		console.log(selected);
		return selected;
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