// A view for an individual food item
var FoodView = Backbone.View.extend({
	el:  $('#userInput'),

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
			$('#showSearch').empty();
			var ul = $('<ul id="foodFilter"></ul>');
			$('#showSearch').append(ul);
			var that = this;
			this.searchableCollection.forEach(function(item) {
				ul.append(new FoodEntryView({model: item, collection: that.foodCollection}).render());
			})
	},

	search: function() {
		var foodChoice = $('input[name="choice"]:checked').val();//the input string
		var searchstring = $('#food').val(); //the input string

		var posting = $.post('https://api.nutritionix.com/v1_1/search' , {
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

		var that = this;
		posting.done(function(data) {

		 	data.hits.forEach(function(item) {
		 		that.searchableCollection.add({
		 			foodItem: item.fields.item_name,
		 			calories: item.fields.nf_calories
		 		});
		 	});
		 	that.render();
		});
	},


	// addItem(): Custom function called via click event above.
    addItem: function(event){
		var food = $('#food').val();
		var calories = $('#calories').val();
		this.foodCollection.create({
			foodItem: food,
			calories: calories
		}); // add item to collection; view is updated via event 'create'

    },

    clear: function() {
    	$('#food').val("");
    	$('#calories').val("");
    	$('#showSearch').empty();

    }

});

var FoodEntryView = Backbone.View.extend({
	tagName: 'li',

	events: {
		'click': 'selectItem'
	},
	initialize: function() {
		_.bindAll(this, 'render', 'selectItem')
	},
	render: function() {
		return this.$el.append(this.model.get("foodItem"));
	},
	selectItem: function() {
		this.collection.create({
			foodItem: this.model.get('foodItem'),
			calories: this.model.get('calories')
		});
	}

});