var Reflux = require('reflux');
var Actions = require('./actions');
var Item = require('./Item.js');

var Store = Reflux.createStore({

	//listenables defines the actions the store can respond to
	listenables: [Actions],
	
	//items is our list of stuff that the store will manage, and the React app will render
	state:{
		items: [],
		summaryCount: 0,
		selectedItem: {}
	},

	minItemQuantity:1,
	maxItemQuantity:9,

	//////////////////////////
	//id->Node Helper functions

	getNodeFromId: function(id)
	{
		for(var i = 0; i < this.state.items.length; i++)
		{
			if (this.state.items[i].id === id)
				return this.state.items[i];
		}
	},

	getNodeIndexFromId: function(id)
	{
		for(var i = 0; i < this.state.items.length; i++)
			if (this.state.items[i].id === id)
				return i;
	},

	getInitialItems: function() {
		this.state.items = [new Item('Sausages', 3), new Item('Baked Beans', 1), new Item('Monkeys', 4)];
		this.setStateFromUrl();
		this.trigger(this.state);
	},

	urlPopState: function () {
		this.setStateFromUrl();
		this.trigger(this.state);
	},

	setStateFromUrl: function () {
		let loc = window.location.href;
		let path = loc.split('#')[1];
		let mo

		//item
		let itemRe = /\/item\/(.*)/
		mo = itemRe.exec(path);
		if (mo) {
			this.state.selectedItem = this.state.items[mo[1]];
		}

		//summary
		let summaryRe = /\/summary/
		mo = summaryRe.exec(path);
		if (mo) {
			this.state.summaryCount = this.state.summaryCount + 1;
		}
	},

	///////////////////////
	//Store Action Handlers

	// this isn't called anymore
	onSearch: function() {
		// Dummy search function. We'd go off to the DB to get stuff here. But for now:
		this.items = this.getInitialItems();
		this.trigger(this.state);
	},

	onAddItem: function(e) {
		this.state.items.push(new Item(e.name));
		this.trigger(this.state); // Inform listeners that items has been updated
	},

	onDeleteItem: function(e) {
		var nodeIndex = this.getNodeIndexFromId(e.id);

		if (nodeIndex !== undefined)
		{
			this.state.items.splice(nodeIndex, 1);
			this.trigger(this.state);	
		}
		else
			console.warn("Store tried to delete node with invalid id");
	},

	onSetItemName: function(e) {
		var node = this.getNodeFromId(e.id);

		if (node)
		{
			node.name = e.name;
			this.trigger(this.state);
		}
		else
			console.warn("Store tried to set node name of node with invalid id");
	},

	onIncItem: function(e) {
		var node = this.getNodeFromId(e.id);

		if (node)
		{
			node.value+=e.inc;

			// Dummy Biz Logic: bind into range
			node.value = Math.min(this.maxItemQuantity, Math.max(this.minItemQuantity, node.value));

			this.trigger(this.state);
		}
		else
			console.warn("Store tried to inc node with invalid id");
	},

	onIncSummary: function() {
		this.state.summaryCount = this.state.summaryCount + 1;
		this.trigger(this.state)
	},
});

window.onpopstate = (e) => {Store.urlPopState()};

module.exports = Store;