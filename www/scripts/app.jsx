//var React = require('react');
import React from 'react';
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var Store = require('./store');
var Actions = require('./actions');
var PageHeader = require('react-bootstrap').PageHeader;
var Button = require('react-bootstrap').Button;
var Well = require('react-bootstrap').Well;
var FormControl = require('react-bootstrap').FormControl;

var ItemComponent = require('./ItemComponent');

class Shape {
	
}

var App = React.createClass({

	////////////////////////////////////////////////////////
	// Reflux listener mixin
	//https://github.com/reflux/refluxjs#using-refluxconnect


	// alanb: is this called by trigger in Store? because 'list' is specified, the first argument to trigger get passed to this.State.list?
	// alanb: because state is being changed, render gets called?
	mixins: [Reflux.connect(Store,'list')], //listen to the store


	/////////////////////////////////////////////////////////////////////////////
	//React getInitialState
	//https://facebook.github.io/react/docs/component-specs.html#getinitialstate

	getInitialState: function() {
		return {
			list: Store.items,
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
			Actions.addItem({name:this.state.itemName});

			//Clear itemName text input
			this.setState({itemName:''});
		}
		else
			console.warn('Items must have a name');
	},

	////////////////////////
	//React component render

	render: function() {
		var AddNewItemDivStyle = {display:'flex', maxHeight:'34px'}; //showing my limited CSS skills here - maxHeight just makes the button sit nice

		var AddNewItemButton;
		// Enable / Disable Add Button depending on whether we have an itemName
		if (this.state.itemName.length) {
			AddNewItemButton = <Button bsStyle='success' onClick={this.handleNewItem}>+</Button>;
		}
		else {
			AddNewItemButton = <Button bsStyle='success' disabled>+</Button>;
		}

		// Controlled vs uncontrolled input components - important reading
		// 		https://facebook.github.io/react/docs/forms.html

		// Why <ItemComponent key={item.id}... />  ?
		// 		http://facebook.github.io/react/docs/multiple-components.html#dynamic-children

		// Styling divs - done here two ways, with an object (AddNewItemDivStyle), and an inline object <div style={{...}}>
		// 		http://facebook.github.io/react/tips/inline-styles.html

		return (
			<div style={{padding:'16px 16px', maxWidth:'600px'}}>

				<PageHeader>LET'S PRETEND WE'RE GOING SHOPPING</PageHeader>

				<Well>
					Add New Item
					<div style={AddNewItemDivStyle}>
						<FormControl type='text' onChange={this.handleNewItemNameChange} onKeyUp={this.handleNewItemNameKeyUp} value={this.state.itemName} />
						{AddNewItemButton}
					</div>
				</Well>
				{// alanb: how do i put an if statment in here so that whether this component displays or not depends on some boolean variable?
				// ans: "https://facebook.github.io/react/tips/if-else-in-JSX.html"
				}
				{
					this.state.list.map(function(item) {
						return <ItemComponent key={item.id} id={item.id} name={item.name} value={item.value}/>;
					})
				}
			</div>
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