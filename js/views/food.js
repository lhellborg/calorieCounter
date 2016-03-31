// A view for an individual food item
var FoodView = Backbone.View.extend({
	tagName: "li",
	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},
	render: function() {
		foodCollection.create({
			foodItem : this.model.get('foodItem'),
  			calories : this.model.get('calories')
  		});

	}
});