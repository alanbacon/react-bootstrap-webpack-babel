var Reflux = require('reflux');

// Actions supported by the store

var Actions = Reflux.createActions([
	"search",
	"addItem",
	"deleteItem",
	"setItemName",
	"incItem"
]);

module.exports = Actions;