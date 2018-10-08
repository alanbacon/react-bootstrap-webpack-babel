import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import { Provider, connect } from "react-redux";
import Store from './storeCtrl/store';

const ReactBootstrap = require('react-bootstrap');
const Glyphicon = ReactBootstrap.Glyphicon;

import Main from './main';
import Summary from './summary';

const mapStateToProps = (state) => {
  return {...state};
};

var App = React.createClass({

	////////////////////////////////////////////////////////
	// Reflux listener mixin
	//https://github.com/reflux/refluxjs#using-refluxconnect


	// alanb: is this called by trigger in Store? because 'state' is specified, the first argument to trigger get passed to this.State.storeState
	// alanb: because state is being changed, render gets called?
	//mixins: [Reflux.connect(Store,'state')], //listen to the store


	/////////////////////////////////////////////////////////////////////////////
	//React getInitialState
	//https://facebook.github.io/react/docs/component-specs.html#getinitialstate

	getInitialState: function() {
		return {
			itemName:''
		};
	},

	componentDidMount: function () {
		Store.getInitialStateFromApi()
	},


	////////////////////////////////////////////////////////////////////////////////////////
	//React componentWillMount
	//https://facebook.github.io/react/docs/component-specs.html#mounting-componentwillmount

	componentWillMount: function() {
		console.log('App component is mounting');
	},

	//////////////////////////////////////////////
	//Our component event handlers (onClicks, etc)

	onSummaryClick: (e) => {
		// don't use me, use setStateFromUrl in store instead
	},

	////////////////////////
	//React component render

	render: function() {

		return (
			<HashRouter>
				<div>
					<nav>
      					<ul>
							<li><Link to='/'>Shop</Link></li>
							<li><Link to='/summary' onClick={this.onSummaryClick}>
									<Glyphicon glyph='gift' />
								</Link></li>
						</ul>

					</nav>
					<Switch>
						<Route exact path='/' render={() =>  <Main list={this.props.items}/>} />
						<Route path='/summary' render={() =>  <Summary visitCount={this.props.summaryCount}/>} />
						<Route path='/item' render={() =>  <h3>{this.props.selectedItem.name}</h3>} />
					</Switch>
				</div>
			</HashRouter>
		);
	}
});

// Export a function that kicks the React rendering off (App is our top level React component)

const AppConnected = connect(mapStateToProps)(App)

module.exports = {
	go:function(){
		ReactDOM.render(
			<Provider store={Store}>
				<AppConnected />
			</Provider>,
			document.getElementById('react')
		);
	}
};