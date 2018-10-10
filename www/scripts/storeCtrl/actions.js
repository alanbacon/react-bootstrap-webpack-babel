import actionNames from "./actionNames";
import Item from '../Item'

async function sleep (ms) {
	  let prm = new Promise(resolve => setTimeout(resolve, ms));
    await prm;
}

async function getItemsFromServer () { // mock slow server call with sleep function
	await sleep(1000);
	return [new Item('Sausages', 3), new Item('Baked Beans', 1), new Item('Monkeys', 4)];
}

async function genActionFromUrl (url) {
	  // there could be API calls in this function
		let path = url.split('#')[1];
		let mo

		//item
		let itemRe = /\/item\/(.*)/
		mo = itemRe.exec(path);
		if (mo) {
			return {
				type: actionNames.SELECT_ITEM, 
				payload: {id: Number(mo[1])}
			}
		}

		//summary
		let summaryRe = /\/summary/
		mo = summaryRe.exec(path);
		if (mo) {
			return {
				type: actionNames.INC_SUMMARY, 
				payload: null
			}
		}

		return {
			type: actionNames.NOOP, 
			payload: null
		}
};

export const urlPop = async (url) => {
	return await genActionFromUrl(url)
};

export const onInitialLoad = async (variant) => {
	if (variant === 'request') {
		console.log('onIntialLoad')
		let items = await getItemsFromServer()
		return addItems(items)
	} else if (variant === 'loading') {
		return {
			type: actionNames.LOADING, 
			payload: true
		}
	} else if (variant === 'loaded') {
		return {
			type: actionNames.LOADING, 
			payload: false
		}
	}
};

export const addItem = (name) => {
	let newItems = [new Item(name)];
	return addItems(newItems);
};

export const addItems = (items) => {
	return {
		type: actionNames.ADD_ITEMS, 
		payload: items
	}
};

export const deleteItem = (id) => {
	return {
		type: actionNames.DELETE_ITEM, 
		payload: id
	}
};

export const setItemName = (id, name) => {
	return {
		type: actionNames.SET_ITEM_NAME, 
		payload: {id, name}
	}
};

export const incItem = (id, val) => {
	return {
		type: actionNames.INC_ITEM, 
		payload: {id, val}
	}
};

export const incSummary = () => {
	return {
		type: actionNames.INC_SUMMARY, 
		payload: null
	}
};