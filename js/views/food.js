// A view for an individual food item
var FoodView = Backbone.View.extend({
	el:  $('#userInput'), //the HTML element used for the food view

	events: {
      'click button#addItem': 'addItem',
      'keyup input#food': 'search',
      'click button#clearAll': 'clear'
    },

	initialize: function() {
		_.bindAll(this, 'render', 'addItem', 'search', 'clear');

		this.foodCollection = this.collection;

	},

	render: function() {
			$('#showSearch').empty(); //take away the items in the showsearch element
			var ul = $('<ul id="foodFilter"><strong>Choose one</strong></ul>');
			$('#showSearch').append(ul);
			var self = this;
			this.searchableCollection.forEach(function(item) {
				ul.append(new FoodEntryView({model: item, collection: self.foodCollection}).render());
			});
	},

	search: function() {
		var foodChoice = $('input[name="choice"]:checked').val();//the input string from radio buttons
		var searchstring = $('#food').val(); //the input string

		var posting = $.post('https://api.nutritionix.com/v1_1/search' , {//calling nutionix api
			 "appId":"38be9a6b",
			 "appKey":"7f1e5364fc8d5c22bfa241fd43987a29",
			 "query": searchstring,
			 "fields":["item_name","brand_name","nf_calories","nf_serving_size_qty","nf_serving_size_unit"],
			  "sort":{
			    "field":"_score",
			    "order":"desc"
			  },
			  "filters":{
			    "item_type":foodChoice
			  }
		});
		this.searchableCollection = new SearchableCollection();

		posting.fail(function() { //error handling
		    alert( "Sorry, could not get food item" );
		  });

		var self = this;
		posting.done(function(data) { //success

		 	data.hits.forEach(function(item) {
		 		self.searchableCollection.add({
		 			foodItem: item.fields.item_name,
		 			calories: item.fields.nf_calories
		 		});
		 	});
		 	self.render();
		});
	},

    addItem: function(event){ // addItem(): Custom function called via click event above.
		var food = $('#food').val();
		var calories = $('#calories').val();
		this.foodCollection.create({ // add item to collection; view is updated via event 'create'
			foodItem: food,
			calories: calories
		});
    },

    clear: function() { //clear up the input fields and empty the searched items
    	$('#food').val("").focus();
    	$('#calories').val("");
    	$('#foodFilter').empty();

    }

});

//for each food item in the foodFilter list to be able to select a specific item in the foodfilter list
var FoodEntryView = Backbone.View.extend({
	tagName: 'li', //the HTML element used for the food entry view

	events: {
		'click': 'selectItem'
	},
	initialize: function() {
		_.bindAll(this, 'render', 'selectItem');
	},
	render: function() { //show each food items name in the food view
		var food = this.model.get("foodItem");
		var cal = this.model.get("calories");
		return this.$el.append(food + ', cal: ' + cal);
	},
	selectItem: function() { //adds the selected item to the food items list
		this.collection.create({
			foodItem: this.model.get('foodItem'),
			calories: this.model.get('calories')
		});
		$('#foodFilter').empty();
		$('#food').val("").focus();
	}

});