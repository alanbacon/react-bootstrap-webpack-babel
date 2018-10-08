import { createStore } from "redux";
import rootReducer from "./reducers";
import { urlPop } from "./actions";
import Item from '../Item'
const Store = createStore(rootReducer);

Store.getInitialStateFromApi = async () => {
	let modState = await genStateFromUrl()
	modState.items = [new Item('Sausages', 3), new Item('Baked Beans', 1), new Item('Monkeys', 4)]; // this could be an async request
	console.log('getInitialState')
	Store.dispatch( urlPop(modState) )
};

const genStateFromUrl = async () => {
	  // there could be API calls in this function
		let url = window.location.href;
		let path = url.split('#')[1];
		let mo

		let modState = {}
		let currentState = Store.getState()

		//item
		let itemRe = /\/item\/(.*)/
		mo = itemRe.exec(path);
		if (mo) {
			modState.selectedItem = currentState.items[mo[1]];
		}

		//summary
		let summaryRe = /\/summary/
		mo = summaryRe.exec(path);
		if (mo) {
			modState.summaryCount = currentState.summaryCount + 1;
		}

		return modState
};

window.onpopstate = async (e) => {
	let modState = await genStateFromUrl();
	console.log('dispatching state')
	Store.dispatch( urlPop(modState) )
};

export default Store;