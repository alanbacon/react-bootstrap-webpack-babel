import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import * as Actions from './storeCtrl/actions';
//import Store from './storeCtrl/store';
import rootReducer from "./storeCtrl/reducers";
import App from './reactComponents/app';

const Store = createStore(rootReducer);

const getUrl = () => {
  return window.location.href;
}

window.onpopstate = async (e) => {
  Store.dispatch( await Actions.urlPop(getUrl()) )
};

const mapStateToProps = (state) => {
  console.log(state)
  return {...state};
};

// dispatch is a Store method
const mapDispatchToProps = (dispatch) => {
  return {
  	onInitialLoad: async () => {
  		dispatch(await Actions.onInitialLoad('loading'))
  		dispatch(await Actions.onInitialLoad('request'))
  		dispatch(await Actions.onInitialLoad('loaded'))
      dispatch(await Actions.urlPop(getUrl()))
  	},
    addItem: (name) => {
      dispatch(Actions.addItem(name))
    },
    deleteItem: (id) => {
      dispatch(Actions.deleteItem(id))
    },
    incItem: (id, diff) => {
      dispatch(Actions.incItem(id, diff))
    },
  }
};

// Export a function that kicks the React rendering off (App is our top level React component)

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App)

ReactDOM.render(
	<Provider store={Store}>
		<AppConnected/>
	</Provider>,
	document.getElementById('react')
);
