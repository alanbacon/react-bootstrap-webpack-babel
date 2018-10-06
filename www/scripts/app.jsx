//var React = require('react');
import React from 'react';
var ReactDOM = require('react-dom');
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
var Reflux = require('reflux');
var Store = require('./store');
var Actions = require('./actions');
var PageHeader = require('react-bootstrap').PageHeader;
var Button = require('react-bootstrap').Button;
var Well = require('react-bootstrap').Well;
var FormControl = require('react-bootstrap').FormControl;

var Main = require('./main');
var Summary = require('./summary');


var App = React.createClass({

	////////////////////////////////////////////////////////
	// Reflux listener mixin
	//https://github.com/reflux/refluxjs#using-refluxconnect


	// alanb: is this called by trigger in Store? because 'state' is specified, the first argument to trigger get passed to this.State.storeState
	// alanb: because state is being changed, render gets called?
	mixins: [Reflux.connect(Store,'state')], //listen to the store


	/////////////////////////////////////////////////////////////////////////////
	//React getInitialState
	//https://facebook.github.io/react/docs/component-specs.html#getinitialstate

	getInitialState: function() {
		return {
			storeState: Store.state,
			itemName:''
		};
	},

	////////////////////////////////////////////////////////////////////////////////////////
	//React componentWillMount
	//https://facebook.github.io/react/docs/component-specs.html#mounting-componentwillmount

	componentWillMount: function() {
		console.log('App component is mounting');
	},

	//////////////////////////////////////////////
	//Our component event handlers (onClicks, etc)

	handleNewItemNameKeyUp:function(e)
	{
		// Allow enter to add new items
		if (e.keyCode === 13)
			this.handleNewItem(e);
	},

	handleNewItemNameChange:function(e) {
		this.setState({itemName:e.target.value});
	},

	handleNewItem:function() {
		if (this.state.itemName.length)
		{
			Actions.addItem({name:this.state.itemName}); // will update store and trigger top level re-render

			//Clear itemName text input
			this.setState({itemName:''}); // set state updates only this component (not top level re-render, although in this case they are almost the same thing) 
		}
		else
			console.warn('Items must have a name');
	},

	onSummaryClick: (e) => {
		Actions.incSummary()
	},


	////////////////////////
	//React component render

	render: function() {
		// Controlled vs uncontrolled input components - important reading
		// 		https://facebook.github.io/react/docs/forms.html

		// Why <ItemComponent key={item.id}... />  ?
		// 		http://facebook.github.io/react/docs/multiple-components.html#dynamic-children

		// Styling divs - done here two ways, with an object (AddNewItemDivStyle), and an inline object <div style={{...}}>
		// 		http://facebook.github.io/react/tips/inline-styles.html

		return (
			<HashRouter>
				<div>
					<nav>
      					<ul>
							<li><Link to='/'>Shop</Link></li>
							<li><Link to='/summary' onClick={this.onSummaryClick}>Summary</Link></li>
						</ul>
					</nav>
					<Switch>
						<Route exact path='/' render={() =>  <Main list={this.state.storeState.items}/>} />
						<Route path='/summary' render={() =>  <Summary visitCount={this.state.storeState.summaryCount}/>} />
					</Switch>
				</div>
			</HashRouter>
		);
	}
});

// Export a function that kicks the React rendering off (App is our top level React component)

module.exports = {
	go:function(){
		ReactDOM.render(
			<App />,
			document.getElementById('react')
		);
	}
};