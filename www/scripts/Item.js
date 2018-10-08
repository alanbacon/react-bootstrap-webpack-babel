var uniqueItemId = 0;

class Item {
	constructor (name, value) {
		this.name = name || "Default Item Name";
		this.value = value || 1;
		this.id = uniqueItemId++;
	}

	copy () {
		let newItem = new Item(this.name, this.value)
		uniqueItemId--
		newItem.id = this.id
		return newItem
	}
}

export default Item;