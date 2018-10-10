import actionNames from "./actionNames";

const MAX_ITEM_QUANTITY = 9;
const MIN_ITEM_QUANTITY = 1;

// const initialState = {
//   items: [],
//   summaryCount: 0,
//   selectedItem: {},
//   isLoading: false
// };

function getItemFromId (id, items) {
  for(let i = 0; i < items.length; i++) {
    if (items[i].id === id)
      return items[i];
  }
};

function getItemIndexFromId (id, items) {
  for(let i = 0; i < items.length; i++)
    if (items[i].id === id)
      return i;
};

function items (items=[], action) {
  switch (action.type) {

    case actionNames.ADD_ITEMS: {
      return items = [...items, ...action.payload];
    }

    case actionNames.DELETE_ITEM: {
      let itemIndex = getItemIndexFromId(action.payload, items);
      if (itemIndex !== undefined) {
        return [
          ...items.slice(0,itemIndex), 
          ...items.slice(itemIndex+1, items.length)
        ]
      } else {
        console.warn("tried to delete node with invalid id");
        return items
      }
    }

    case actionNames.SET_ITEM_NAME: {
      let itemIndex = getItemIndexFromId(action.payload, items);
      if (itemIndex != undefined) {
        let newItem = items[itemIndex].copy()           // don't mutate anything, create new objects
        newItem.name = action.payload;
        return [
          ...items.slice(0,itemIndex), 
          newItem,
          ...items.slice(itemIndex+1, items.length)
        ]
      } else {
        console.warn("tried to set item name of item with invalid id");
        return items
      }
    }

    case actionNames.INC_ITEM: {
      let itemIndex = getItemIndexFromId(action.payload.id, items);
      if (itemIndex != undefined) {
        let newItem = items[itemIndex].copy()           // don't mutate anything, create new objects
        newItem.value += action.payload.val;
        newItem.value = Math.min(MAX_ITEM_QUANTITY, Math.max(MIN_ITEM_QUANTITY, newItem.value));
        return [
          ...items.slice(0,itemIndex), 
          newItem,
          ...items.slice(itemIndex+1, items.length)
        ]
      } else {
        console.warn("tried to increment item with invalid id");
        return items
      }
    }

    default:
      return items
  }
}

function itemSelection (selectedItem={}, action, items) {
  switch (action.type) {

    case actionNames.SELECT_ITEM: {
      let item = getItemFromId(action.payload.id, items);
      if (item != undefined) {
        return item
      } else {
        console.warn("tried to select item with invalid id");
        return {}
      }
    }

    default: 
      return selectedItem

  }
}

function summaryCount (summaryCount=0, action) {
  switch (action.type) {

    case actionNames.INC_SUMMARY: {
      return summaryCount + 1;  
    }

    default:
      return summaryCount

  }
}

function isLoading (isLoading=0, action) {
  switch (action.type) {

    case actionNames.LOADING: {
      return action.payload;  
    }

    default:
      return isLoading

  }
}

function rootReducer(state = {}, action) {
  return {
    items: items(state.items, action),
    selectedItem: itemSelection(state.selectedItem, action, state.items),
    summaryCount: summaryCount(state.summaryCount, action),
    isLoading: isLoading(state.isLoading, action)
  }
}


export default rootReducer;
