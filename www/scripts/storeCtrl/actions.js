import actionNames from "./actionNames";
import Item from '../Item'

export const urlPop = (state) => {
	return { 
		type: actionNames.URL_POP, 
		payload: state 
	}
};

export const addItem = (name) => {
	return {
		type: actionNames.ADD_ITEM, 
		payload: new Item(name)
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