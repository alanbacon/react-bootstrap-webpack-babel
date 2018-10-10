import actionNames from "./actionNames";

const MAX_ITEM_QUANTITY = 9;
const MIN_ITEM_QUANTITY = 1;

const initialState = {
  items: [],
  summaryCount: 0,
  selectedItem: {},
  isLoading: false
};

const getItemFromId = (id, items) => {
  for(let i = 0; i < items.length; i++) {
    if (items[i].id === id)
      return items[i];
  }
};

const getItemIndexFromId = (id, items) => {
  for(let i = 0; i < items.length; i++)
    if (items[i].id === id)
      return i;
};

const rootReducer = (state=initialState, action) => {
  switch (action.type) {
    case actionNames.URL_POP: 
      return { ...state, ...action.payload };

    case actionNames.ADD_ITEM: {
      let items = [...state.items, action.payload];
      return ({...state, ...{items}});
    }

    case actionNames.ADD_ITEMS: {
      let items = [...state.items, ...action.payload];
      return ({...state, ...{items}});
    }

    case actionNames.DELETE_ITEM: {
      let itemIndex = getItemIndexFromId(action.payload, state.items);
      if (itemIndex !== undefined) {
        let items = [
          ...state.items.slice(0,itemIndex), 
          ...state.items.slice(itemIndex+1, state.items.length)
        ]
        return ({...state, ...{items}});
      } else {
        console.warn("tried to delete node with invalid id");
        return {...state}
      }
    }

    case actionNames.SET_ITEM_NAME: {
      let itemIndex = getItemIndexFromId(action.payload, state.items);
      if (itemIndex != undefined) {
        let newItem = state.items[itemIndex].copy()
        newItem.name = action.payload;
        let items = [
          ...state.items.slice(0,itemIndex), 
          newItem,
          ...state.items.slice(itemIndex+1, state.items.length)
        ]
        return ({...state, ...{items}});
      } else {
        console.warn("tried to set item name of item with invalid id");
        return {...state}
      }
    }

    case actionNames.INC_ITEM: {
      let itemIndex = getItemIndexFromId(action.payload.id, state.items);
      if (itemIndex != undefined) {
        let newItem = state.items[itemIndex].copy()
        newItem.value += action.payload.val;
        newItem.value = Math.min(MAX_ITEM_QUANTITY, Math.max(MIN_ITEM_QUANTITY, newItem.value));
        let items = [
          ...state.items.slice(0,itemIndex), 
          newItem,
          ...state.items.slice(itemIndex+1, state.items.length)
        ]
        return ({...state, ...{items}});
      } else {
        console.warn("tried to increment item with invalid id");
        return {...state}
      }
    }

    case actionNames.SELECT_ITEM: {
      let item = getItemFromId(action.payload.id, state.items);
      if (item != undefined) {
        return ({
          ...state, 
          ...{selectedItem: item}
        })
      } else {
        console.warn("tried to select item with invalid id");
        return ({
          ...state, 
          ...{selectedItem: {} }
        })
      }
    }

    case actionNames.INC_SUMMARY: {
      return ({
        ...state, 
        ...{summaryCount: (state.summaryCount + 1)}
      }); 
    }

    case actionNames.LOADING: {
      return ({
        ...state, 
        ...{isLoading: action.payload}
      });
    }

    case actionNames.NOOP:
      return state;

    default:
      return state;
  }
};


export default rootReducer;
