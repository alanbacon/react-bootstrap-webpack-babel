var uniqueItemId = 0;

function Item(name, value) {
	this.name = name || "Default Item Name";
	this.value = value || 1;
	this.id = uniqueItemId++;
}

module.exports = Item;